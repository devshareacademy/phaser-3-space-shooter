/**
 * A base component for handling player or AI input.
 * For handling player input in a Phaser 3 game, this class
 * should be extended to support the built in input methods from Phaser,
 * such as keyboard, gamepad, touch, etc. For an example, please see
 * the `KeyboardInputComponent` class.
 *
 * For AI, this class can be extended to support custom logic for the AI
 * to update the inputs to support the movement that is needed. For an
 * example, please see the `BotFighterInputComponent` class.
 */
export class InputComponent {
  /** @protected @type {boolean} */
  _up;
  /** @protected @type {boolean} */
  _down;
  /** @protected @type {boolean} */
  _left;
  /** @protected @type {boolean} */
  _right;
  /** @protected @type {boolean} */
  _shoot;

  constructor() {
    this.reset();
  }

  /** @type {boolean} */
  get leftIsDown() {
    return this._left;
  }

  /** @type {boolean} */
  get rightIsDown() {
    return this._right;
  }

  /** @type {boolean} */
  get downIsDown() {
    return this._down;
  }

  /** @type {boolean} */
  get upIsDown() {
    return this._up;
  }

  /** @type {boolean} */
  get shootIsDown() {
    return this._shoot;
  }

  /**
   * Resets all of the inputs back to their default values `false`.
   * @returns {void}
   */
  reset() {
    this._up = false;
    this._down = false;
    this._right = false;
    this._left = false;
    this._shoot = false;
  }
}
