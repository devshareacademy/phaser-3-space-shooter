import Phaser from '../lib/phaser.js';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    this.add
      .text(this.scale.width / 2, this.scale.height / 2, 'Hello World', {
        fontSize: '32px',
      })
      .setOrigin(0.5);
  }
}
