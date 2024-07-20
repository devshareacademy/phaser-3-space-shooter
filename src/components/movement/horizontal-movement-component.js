import { isSpriteWithDynamicBody } from '../../types/typedef.js';
import * as CONFIG from '../../config.js';

export class HorizontalMovementComponent {
  #gameObject;
  #inputComponent;
  #velocity;

  constructor(gameObject, inputComponent, velocity) {
    this.#gameObject = gameObject;
    this.#inputComponent = inputComponent;
    this.#velocity = velocity;

    if (!isSpriteWithDynamicBody(this.#gameObject.body)) {
      return;
    }
    this.#gameObject.body.setDamping(true);
    this.#gameObject.body.setDrag(CONFIG.COMPONENT_MOVEMENT_HORIZONTAL_DRAG);
    this.#gameObject.body.setMaxVelocity(CONFIG.COMPONENT_MOVEMENT_HORIZONTAL_MAX_VELOCITY);
  }

  reset() {
    if (!isSpriteWithDynamicBody(this.#gameObject.body)) {
      return;
    }
    this.#gameObject.body.velocity.x = 0;
    this.#gameObject.body.setAngularAcceleration(0);
  }

  /**
   * @returns {void}
   */
  update() {
    if (!isSpriteWithDynamicBody(this.#gameObject.body)) {
      return;
    }

    if (this.#inputComponent.leftIsDown) {
      this.#gameObject.body.velocity.x -= this.#velocity;
    } else if (this.#inputComponent.rightIsDown) {
      this.#gameObject.body.velocity.x += this.#velocity;
    } else {
      this.#gameObject.body.setAngularAcceleration(0);
    }
  }
}
