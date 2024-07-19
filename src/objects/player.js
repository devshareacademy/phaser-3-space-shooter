import Phaser from '../lib/phaser.js';

export class Player extends Phaser.GameObjects.Container {
  /** @type {Phaser.GameObjects.Sprite} */
  #shipSprite;
  /** @type {Phaser.GameObjects.Sprite} */
  #shipEngineSprite;
  /** @type {Phaser.GameObjects.Sprite} */
  #shipEngineThrusterSprite;

  constructor(scene) {
    super(scene, scene.scale.width / 2, scene.scale.height - 32, []);

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setSize(24, 24);
    this.body.setOffset(-12, -12);
    this.body.setCollideWorldBounds(true);
    this.setDepth(2);

    this.#shipSprite = this.scene.add.sprite(0, 0, 'ship', 0);
    this.#shipEngineSprite = this.scene.add.sprite(0, 0, 'ship_engine', 0);
    this.#shipEngineThrusterSprite = this.scene.add.sprite(0, 0, 'ship_engine_thruster', 0);
    this.#shipEngineThrusterSprite.play('ship_engine_thruster');
    this.add([this.#shipEngineThrusterSprite, this.#shipEngineSprite, this.#shipSprite]);
  }
}
