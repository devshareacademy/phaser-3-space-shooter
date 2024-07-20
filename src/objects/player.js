import Phaser from '../lib/phaser.js';
import { KeyboardInputComponent } from '../components/input/keyboard-input-component.js';
import { HorizontalMovementComponent } from '../components/movement/horizontal-movement-component.js';
import * as CONFIG from '../config.js';

export class Player extends Phaser.GameObjects.Container {
  #keyboardInputComponent;
  #horizontalMovementComponent;
  #shipSprite;
  #shipEngineSprite;
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

    this.#keyboardInputComponent = new KeyboardInputComponent(this.scene);
    this.#horizontalMovementComponent = new HorizontalMovementComponent(
      this,
      this.#keyboardInputComponent,
      CONFIG.PLAYER_MOVEMENT_HORIZONTAL_VELOCITY
    );

    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    this.once(
      Phaser.GameObjects.Events.DESTROY,
      () => {
        this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
      },
      this
    );
  }

  update(ts, dt) {
    if (!this.active) {
      return;
    }

    this.#keyboardInputComponent.update();
    this.#horizontalMovementComponent.update();
  }
}
