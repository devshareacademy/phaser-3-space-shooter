import Phaser from '../../lib/phaser.js';
import { InputComponent } from '../input/input-component.js';
import { CUSTOM_EVENTS, EventBusComponent } from '../events/event-bus-component.js';

/**
 * @typedef BulletConfig
 * @type {object}
 * @property {number} speed
 * @property {number} interval
 * @property {number} lifespan
 * @property {number} maxCount
 * @property {number} yOffset
 * @property {boolean} flipY
 */

/**
 * The `WeaponComponent` is used for enabling a game object to fire bullets
 * in our game. When input is detected from the provided `InputComponent`, this
 * component will check if we are able to fire a new bullet and do so based on the
 * fire interval and the max number of bullets that can be on screen at a time for
 * the attached game object.
 *
 * The bullet game objects are managed via a Phaser 3 Group, that way we can create
 * a simple object pool.
 */
export class WeaponComponent {
  /** @type {Phaser.GameObjects.Container} */
  #gameObject;
  /** @type {InputComponent} */
  #inputComponent;
  /** @type {Phaser.GameObjects.Group} */
  #bulletGroup;
  /** @type {number} */
  #fireBulletInterval;
  /** @type {BulletConfig} */
  #bulletConfig;
  /** @type {EventBusComponent} */
  #eventBusComponent;

  /**
   * @param {Phaser.GameObjects.Container} gameObject
   * @param {InputComponent} inputComponent
   * @param {BulletConfig} bulletConfig
   * @param {EventBusComponent} eventBusComponent
   */
  constructor(gameObject, inputComponent, bulletConfig, eventBusComponent) {
    this.#gameObject = gameObject;
    this.#inputComponent = inputComponent;
    this.#bulletConfig = bulletConfig;
    this.#eventBusComponent = eventBusComponent;
    this.#fireBulletInterval = 0;

    this.#bulletGroup = this.#gameObject.scene.physics.add.group({
      name: `bullets-${Phaser.Math.RND.uuid()}`,
      enable: false,
    });
    this.#bulletGroup.createMultiple({
      key: 'bullet',
      quantity: this.#bulletConfig.maxCount,
      active: false,
      visible: false,
    });

    this.#gameObject.scene.physics.world.on(Phaser.Physics.Arcade.Events.WORLD_STEP, this.worldStep, this);
    this.#gameObject.once(
      Phaser.GameObjects.Events.DESTROY,
      () => {
        this.#gameObject.scene.physics.world.off(Phaser.Physics.Arcade.Events.WORLD_STEP, this.worldStep, this);
      },
      this
    );
  }

  /** @type {Phaser.GameObjects.Group} */
  get bulletGroup() {
    return this.#bulletGroup;
  }

  /**
   * @param {number} dt
   * @returns {void}
   */
  update(dt) {
    this.#fireBulletInterval -= dt;
    if (this.#fireBulletInterval > 0) {
      return;
    }

    if (this.#inputComponent.shootIsDown) {
      const bullet = this.#bulletGroup.getFirstDead();
      if (bullet === undefined || bullet === null) {
        return;
      }

      const x = this.#gameObject.x;
      const y = this.#gameObject.y + this.#bulletConfig.yOffset;
      bullet.enableBody(true, x, y, true, true);
      bullet.body.velocity.y -= this.#bulletConfig.speed;
      bullet.setState(this.#bulletConfig.lifespan);
      bullet.play('bullet');
      bullet.setScale(0.8);
      bullet.body.setSize(14, 18);
      bullet.setFlipY(this.#bulletConfig.flipY);

      this.#fireBulletInterval = this.#bulletConfig.interval;
      this.#eventBusComponent.emit(CUSTOM_EVENTS.SHIP_SHOOT);
    }
  }

  /**
   * @param {number} delta
   * @returns {void}
   */
  worldStep(delta) {
    /** @type {Phaser.Types.Physics.Arcade.SpriteWithDynamicBody[]} */
    (this.#bulletGroup.getChildren()).forEach((bullet) => {
      if (!bullet.active) {
        return;
      }

      /** @type {number} */
      (bullet.state) -= delta;
      if (/** @type {number} */ (bullet.state) <= 0) {
        bullet.disableBody(true, true);
      }
    });
  }

  /**
   * @param {Phaser.Types.Physics.Arcade.SpriteWithDynamicBody} bullet
   */
  destroyBullet(bullet) {
    bullet.setState(0);
  }
}
