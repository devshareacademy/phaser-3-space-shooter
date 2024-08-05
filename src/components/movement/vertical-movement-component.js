import Phaser from '../../lib/phaser.js';
import { isSpriteWithDynamicBody } from '../../types/typedef.js';
import { InputComponent } from '../input/input-component.js';
import * as CONFIG from '../../config.js';

/**
 * Component that allows for vertical movement in a Phaser 3 game.
 * This component relies on the built in Phaser 3 Arcade Physics system
 * to move the Phaser 3 game objects around the scene. When input is detected
 * (via the InputComponent), this component will update the physics body
 * velocity.
 */
export class VerticalMovementComponent {
  /** @type {Phaser.Physics.Arcade.Sprite | Phaser.GameObjects.Container} */
  #gameObject;
  /** @type {InputComponent} */
  #inputComponent;
  /** @type {number} */
  #velocity;

  /**
   * @param {Phaser.Physics.Arcade.Sprite | Phaser.GameObjects.Container} gameObject
   * @param {InputComponent} inputComponent
   * @param {number} velocity
   */
  constructor(gameObject, inputComponent, velocity) {
    this.#gameObject = gameObject;
    this.#inputComponent = inputComponent;
    this.#velocity = velocity;

    this.#gameObject.body.setDamping(true);
    this.#gameObject.body.setDrag(CONFIG.COMPONENT_MOVEMENT_VERTICAL_DRAG);
    this.#gameObject.body.setMaxVelocity(CONFIG.COMPONENT_MOVEMENT_VERTICAL_MAX_VELOCITY);
  }

  /**
   * @returns {void}
   */
  reset() {
    this.#gameObject.body.velocity.y = 0;
    this.#gameObject.body.setAngularAcceleration(0);
  }

  /**
   * @returns {void}
   */
  update() {
    if (this.#inputComponent.downIsDown) {
      this.#gameObject.body.velocity.y += this.#velocity;
    } else if (this.#inputComponent.upIsDown) {
      this.#gameObject.body.velocity.y -= this.#velocity;
    } else {
      this.#gameObject.body.setAngularAcceleration(0);
    }
  }
}
