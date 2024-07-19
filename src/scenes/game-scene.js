import Phaser from '../lib/phaser.js';
import { Player } from '../objects/player.js';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    const player = new Player(this);
  }
}
