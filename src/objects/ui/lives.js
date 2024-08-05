import { CUSTOM_EVENTS, EventBusComponent } from '../../components/events/event-bus-component.js';
import * as CONFIG from '../../config.js';

/**
 * Simple UI component for presenting the players lives in the UI of our game.
 */
export class Lives extends Phaser.GameObjects.Container {
  /** @type {number} */
  #lives;
  /** @type {EventBusComponent} */
  #eventBusComponent;

  /**
   * @param {Phaser.Scene} scene
   * @param {EventBusComponent} eventBusComponent
   */
  constructor(scene, eventBusComponent) {
    super(scene, 5, scene.scale.height - 30, []);
    this.#eventBusComponent = eventBusComponent;
    this.#lives = CONFIG.PLAYER_LIVES;
    this.scene.add.existing(this);

    // create life icons
    for (let i = 0; i < this.#lives; i += 1) {
      const ship = scene.add
        .image(i * 20, 0, 'ship')
        .setScale(0.6)
        .setOrigin(0);
      this.add(ship);
    }

    this.#eventBusComponent.on(CUSTOM_EVENTS.PLAYER_DESTROYED, () => {
      this.#lives -= 1;
      this.getAt(this.#lives).destroy();
      this.scene.cameras.main.shake(500, 0.01);

      if (this.#lives > 0) {
        scene.time.delayedCall(1500, () => {
          this.#eventBusComponent.emit(CUSTOM_EVENTS.PLAYER_SPAWN);
        });
        return;
      }

      this.scene.add
        .text(this.scene.scale.width / 2, this.scene.scale.height / 2, 'GAME OVER', {
          fontSize: '24px',
        })
        .setOrigin(0.5);

      this.#eventBusComponent.emit(CUSTOM_EVENTS.GAME_OVER);
    });

    this.#eventBusComponent.emit(CUSTOM_EVENTS.PLAYER_SPAWN);
  }
}
