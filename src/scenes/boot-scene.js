import Phaser from '../lib/phaser.js';

/**
 * Responsible for loading any assets that are required in the `PreloadScene`
 * state of our game.
 */
export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  /**
   * @returns {void}
   */
  preload() {
    this.load.json('animations_json', 'assets/data/animations.json');
  }

  /**
   * @returns {void}
   */
  create() {
    this.scene.start('PreloadScene');
  }
}
