import Phaser from '../../lib/phaser.js';
import { CUSTOM_EVENTS, EventBusComponent } from '../events/event-bus-component.js';

/**
 * Creates a Phaser 3 Group that is used for spawning game
 * objects when an enemy game object is destroyed. These
 * game objects will play the destroyed animation that is associated
 * with that enemy game object.
 *
 * The Phaser 3 Group is used to create a simple object pool that allows
 * us to reuse the enemy game objects that are created.
 */
export class EnemyDestroyedComponent {
  /** @type {Phaser.Scene} */
  #scene;
  /** @type {Phaser.GameObjects.Group} */
  #group;
  /** @type {EventBusComponent} */
  #eventBusComponent;

  /**
   * @param {Phaser.Scene} scene
   * @param {EventBusComponent} eventBusComponent
   */
  constructor(scene, eventBusComponent) {
    this.#scene = scene;
    this.#eventBusComponent = eventBusComponent;

    // create group
    this.#group = this.#scene.add.group({
      name: `${this.constructor.name}-${Phaser.Math.RND.uuid()}`,
    });

    this.#eventBusComponent.on(
      CUSTOM_EVENTS.ENEMY_DESTROYED,
      (/** @type {import('../../types/typedef.js').Enemy} */ enemy) => {
        /** @type {Phaser.GameObjects.Sprite} */
        const gameObject = this.#group.get(enemy.x, enemy.y, enemy.shipAssetKey, 0);
        gameObject.play({
          key: enemy.shipDestroyedAnimationKey,
        });
      }
    );
  }
}
