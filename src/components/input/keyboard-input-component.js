import Phaser from '../../lib/phaser.js';
import { InputComponent } from './input-component.js';

/**
 * A custom `InputComponent` that relies on the Phaser 3 Keyboard
 * Plugin to detect input in the web browser.
 */
export class KeyboardInputComponent extends InputComponent {
  /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
  #cursorKeys;
  /** @type {boolean} */
  #inputLocked;

  /**
   * @param {Phaser.Scene} scene
   */
  constructor(scene) {
    super();
    this.#cursorKeys = scene.input.keyboard.createCursorKeys();
    this.#inputLocked = false;
  }

  /**
   * @param {boolean} val
   */
  set lockInput(val) {
    this.#inputLocked = val;
  }

  /**
   * Updates the input values based on the Phaser 3 keyboard implementation.
   * @returns {void}
   */
  update() {
    if (this.#inputLocked) {
      this.reset();
      return;
    }

    this._up = this.#cursorKeys.up.isDown;
    this._down = this.#cursorKeys.down.isDown;
    this._left = this.#cursorKeys.left.isDown;
    this._right = this.#cursorKeys.right.isDown;
    this._shoot = this.#cursorKeys.space.isDown;
  }
}
