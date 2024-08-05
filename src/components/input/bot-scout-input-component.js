import Phaser from '../../lib/phaser.js';
import { InputComponent } from './input-component.js';
import * as CONFIG from '../../config.js';

/**
 * A custom `InputComponent` that is used for the `Scout` enemy
 * type. This class is responsible for building out the simple AI
 * that will be used for moving the enemy game object in the game.
 *
 * For the `Scout` enemy, the enemy will move in a wave pattern
 * by moving left and right across the screen. This enemy does
 * not fire their weapon.
 */
export class BotScoutInputComponent extends InputComponent {
  /** @type {Phaser.GameObjects.Container} */
  #gameObject;
  /**
   * The starting position of the Phaser 3 game object when it spawns in the game. Used in
   * calculating how far an enemy can move left and right before switching directions.
   * @type {number}
   */
  #startX;
  /**
   * How far the enemy will move horizontally across the screen before moving in the other direction.
   * @type {number}
   */
  #maxXMovement;

  /**
   * @param {Phaser.GameObjects.Container} gameObject
   */
  constructor(gameObject) {
    super();
    this.#gameObject = gameObject;
    this.#startX = this.#gameObject.x;
    this.#maxXMovement = CONFIG.ENEMY_SCOUT_MOVEMENT_MAX_X;
    this._right = true;
    this._left = false;
    this._down = true;
  }

  /**
   * Used for resetting the default starting X position of the Phaser 3 game object since
   * we reuse the same Game Objects in our game.
   * @param {number} val
   * @returns {void}
   */
  set startX(val) {
    this.#startX = val;
  }

  /**
   * Creates a simple AI movement pattern of moving left and right across the screen
   * automatically.
   * @returns {void}
   */
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
