import Phaser from '../../lib/phaser.js';
import { BotFighterInputComponent } from '../../components/input/bot-fighter-input-component.js';
import { VerticalMovementComponent } from '../../components/movement/vertical-movement-component.js';
import { WeaponComponent } from '../../components/weapon/weapon-component.js';
import { HealthComponent } from '../../components/health/health-component.js';
import { ColliderComponent } from '../../components/collider/collider-component.js';
import { CUSTOM_EVENTS } from '../../components/events/event-bus-component.js';
import * as CONFIG from '../../config.js';

export class FighterEnemy extends Phaser.GameObjects.Container {
  #inputComponent;
  #weaponComponent;
  #verticalMovementComponent;
  #healthComponent;
  #colliderComponent;
  #shipSprite;
  #shipEngineSprite;
  #eventBusComponent;

  constructor(scene, x, y) {
    super(scene, x, y, []);

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setSize(24, 24);
    this.body.setOffset(-12, -12);

    this.#shipSprite = this.scene.add.sprite(0, 0, 'fighter', 0);
    this.#shipEngineSprite = this.scene.add.sprite(0, 0, 'fighter_engine', 0).setFlipY(true);
    this.#shipEngineSprite.play('fighter_engine');
    this.add([this.#shipSprite, this.#shipEngineSprite]);
  }

  get colliderComponent() {
    return this.#colliderComponent;
  }

  get healthComponent() {
    return this.#healthComponent;
  }

  get weaponGameObjectGroup() {
    return this.#weaponComponent.bulletGroup;
  }

  get weaponComponent() {
    return this.#weaponComponent;
  }

  get shipAssetKey() {
    return 'fighter';
  }

  get shipDestroyedAnimationKey() {
    return 'fighter_destroy';
  }

  init(eventBusComponent) {
    this.#eventBusComponent = eventBusComponent;
    this.#inputComponent = new BotFighterInputComponent();
    this.#verticalMovementComponent = new VerticalMovementComponent(
      this,
      this.#inputComponent,
      CONFIG.ENEMY_FIGHTER_MOVEMENT_VERTICAL_VELOCITY
    );
    this.#weaponComponent = new WeaponComponent(this, this.#inputComponent, {
      speed: CONFIG.ENEMY_FIGHTER_BULLET_SPEED,
      interval: CONFIG.ENEMY_FIGHTER_BULLET_INTERVAL,
      lifespan: CONFIG.ENEMY_FIGHTER_BULLET_LIFESPAN,
      maxCount: CONFIG.ENEMY_FIGHTER_BULLET_MAX_COUNT,
      yOffset: 10,
      flipY: true,
    });

    this.#healthComponent = new HealthComponent(CONFIG.ENEMY_FIGHTER_HEALTH);
    this.#colliderComponent = new ColliderComponent(this.#healthComponent);
    this.#eventBusComponent.emit(CUSTOM_EVENTS.ENEMY_INIT, this);
  }

  /**
   * @returns {void}
   */
  reset() {
    this.#shipSprite.setTexture('fighter');
    this.#shipEngineSprite.setVisible(true);
    this.setActive(true);
    this.setVisible(true);
    this.#healthComponent.reset();
  }

  update(ts, dt) {
    if (this.#eventBusComponent === undefined) {
      return;
    }

    if (!this.active) {
      return;
    }

    if (this.#healthComponent.isDead) {
      this.setActive(false);
      this.setVisible(false);
      this.#shipEngineSprite.setVisible(false);
      return;
    }

    this.#verticalMovementComponent.update();
    this.#weaponComponent.update(dt);
  }
}
