export class Player extends Phaser.GameObjects.Container {
  #shipSprite;
  #shipEngineSprite;
  #shipEngineThrusterSprite;

  constructor(scene) {
    super(scene, scene.scale.width / 2, scene.scale.height - 32, []);

    this.scene.add.existing(this);

    this.#shipSprite = scene.add.sprite(0, 0, 'ship');
    this.#shipEngineSprite = scene.add.sprite(0, 0, 'ship_engine');
    this.#shipEngineThrusterSprite = scene.add.sprite(0, 0, 'ship_engine_thruster');
    this.#shipEngineThrusterSprite.play('ship_engine_thruster');
    this.add([this.#shipEngineThrusterSprite, this.#shipEngineSprite, this.#shipSprite]);
  }
}
