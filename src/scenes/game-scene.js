import Phaser from '../lib/phaser.js';
import { FighterEnemy } from '../objects/enemies/fighter-enemy.js';
import { ScoutEnemy } from '../objects/enemies/scout-enemy.js';
import { Player } from '../objects/player.js';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    const player = new Player(this);
    //this.enemy = new ScoutEnemy(this, this.scale.width / 2, 0);
    this.enemy = new FighterEnemy(this, this.scale.width / 2, 0);
  }

  update(ts, dt) {
    this.enemy.update(ts, dt);
  }
}
