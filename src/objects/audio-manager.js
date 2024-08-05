import Phaser from '../lib/phaser.js';
import { CUSTOM_EVENTS, EventBusComponent } from '../components/events/event-bus-component.js';

/**
 * Responsible for managing the audio in our game by reacting to various
 * events in our game.
 */
export class AudioManager {
  /** @type {Phaser.Scene} */
  #scene;

  /** @type {EventBusComponent} */
  #eventBusComponent;

  /**
   * @param {Phaser.Scene} scene
   * @param {EventBusComponent} eventBusComponent
   */
  constructor(scene, eventBusComponent) {
    this.#scene = scene;
    this.#eventBusComponent = eventBusComponent;

    // start background music
    this.#scene.sound.play('bg', {
      volume: 0.6,
      loop: true,
    });

    // listen for ship destroyed events
    this.#eventBusComponent.on(CUSTOM_EVENTS.ENEMY_DESTROYED, () => {
      this.#scene.sound.play('explosion', {
        volume: 0.6,
      });
    });
    this.#eventBusComponent.on(CUSTOM_EVENTS.PLAYER_DESTROYED, () => {
      this.#scene.sound.play('explosion', {
        volume: 0.6,
      });
    });

    // listen for ship hit events
    this.#eventBusComponent.on(CUSTOM_EVENTS.SHIP_HIT, () => {
      this.#scene.sound.play('hit', {
        volume: 0.6,
      });
    });

    // listen for ship fire bullet events
    this.#eventBusComponent.on(CUSTOM_EVENTS.SHIP_SHOOT, () => {
      this.#scene.sound.play('shot1', {
        volume: 0.05,
      });
    });
  }
}
