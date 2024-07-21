import { CUSTOM_EVENTS } from '../components/events/event-bus-component.js';

export class AudioManager {
  #eventBusComponent;

  constructor(scene, eventBusComponent) {
    this.#eventBusComponent = eventBusComponent;

    // start background music
    scene.sound.play('bg', {
      loop: true,
      volume: 0.6,
    });

    // listen for ship destroyed events
    this.#eventBusComponent.on(CUSTOM_EVENTS.ENEMY_DESTROYED, () => {
      scene.sound.play('explosion', { volume: 0.6 });
    });
    this.#eventBusComponent.on(CUSTOM_EVENTS.PLAYER_DESTROYED, () => {
      scene.sound.play('explosion', { volume: 0.6 });
    });

    // listen for ship hit events
    this.#eventBusComponent.on(CUSTOM_EVENTS.SHIP_HIT, () => {
      scene.sound.play('hit', { volume: 0.6 });
    });

    // listen for ship fire bullet events
    this.#eventBusComponent.on(CUSTOM_EVENTS.SHIP_SHOOT, () => {
      scene.sound.play('shot1', { volume: 0.05 });
    });
  }
}
