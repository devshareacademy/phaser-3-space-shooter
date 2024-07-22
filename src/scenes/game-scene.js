import Phaser from '../lib/phaser.js';
import { Player } from '../objects/player.js';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    this.load.pack('asset_pack', 'assets/data/assets.json');
  }

  create() {
    const player = new Player(this);
  }
}
