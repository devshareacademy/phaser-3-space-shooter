// @ts-nocheck
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

    this.physics.add.overlap(player, this.enemy, (playerGameObject, enemyGameObject) => {
      if (!enemyGameObject.active || !playerGameObject.active) {
        return;
      }
      playerGameObject.colliderComponent.collideWithEnemyShip();
      enemyGameObject.colliderComponent.collideWithEnemyShip();
    });
    this.physics.add.overlap(player, this.enemy.weaponGameObjectGroup, (playerGameObject, projectileGameObject) => {
      if (!playerGameObject.active) {
        return;
      }
      this.enemy.weaponComponent.destroyBullet(projectileGameObject);
      playerGameObject.colliderComponent.collideWithEnemyProjectile();
    });

    this.physics.add.overlap(player.weaponGameObjectGroup, this.enemy, (enemyGameObject, projectileGameObject) => {
      if (!enemyGameObject.active) {
        return;
      }
      player.weaponComponent.destroyBullet(projectileGameObject);
      enemyGameObject.colliderComponent.collideWithEnemyProjectile();
    });
  }

  update(ts, dt) {
    this.enemy.update(ts, dt);
  }
}
