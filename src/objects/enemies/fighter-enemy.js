import { BotFighterInputComponent } from '../../components/input/bot-fighter-input-component.js';
import { VerticalMovementComponent } from '../../components/movement/vertical-movement-component.js';
import * as CONFIG from '../../config.js';

export class FighterEnemy extends Phaser.GameObjects.Container {
  #inputComponent;
  #verticalMovementComponent;
  #shipSprite;
  #shipEngineSprite;

  constructor(scene, x, y) {
    super(scene, x, y, []);

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setSize(24, 24);
    this.body.setOffset(-12, -12);

    this.#shipSprite = scene.add.sprite(0, 0, 'fighter', 0);
    this.#shipEngineSprite = scene.add.sprite(0, 0, 'fighter_engine').setFlipY(true);
    this.#shipEngineSprite.play('fighter_engine');
    this.add([this.#shipEngineSprite, this.#shipSprite]);

    this.#inputComponent = new BotFighterInputComponent();
    this.#verticalMovementComponent = new VerticalMovementComponent(
      this,
      this.#inputComponent,
      CONFIG.ENEMY_FIGHTER_MOVEMENT_VERTICAL_VELOCITY
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
    this.#inputComponent.update();
    this.#verticalMovementComponent.update();
  }
}
