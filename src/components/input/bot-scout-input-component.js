import { InputComponent } from './input-component.js';
import * as CONFIG from '../../config.js';

export class BotScoutInputComponent extends InputComponent {
  #gameObject;
  #startX;
  #maxXMovement;

  constructor(gameObject) {
    super();
    this.#gameObject = gameObject;
    this.#startX = this.#gameObject.x;
    this.#maxXMovement = CONFIG.ENEMY_SCOUT_MOVEMENT_MAX_X;
    this._right = true;
    this._down = true;
    this._left = false;
  }

  set startX(val) {
    this.#startX = val;
  }

  update() {
    if (this.#gameObject.x > this.#startX + this.#maxXMovement) {
      this._left = true;
      this._right = false;
    } else if (this.#gameObject.x < this.#startX - this.#maxXMovement) {
      this._left = false;
      this._right = true;
    }
  }
}
