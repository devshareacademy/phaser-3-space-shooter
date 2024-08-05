import { CUSTOM_EVENTS } from '../events/event-bus-component.js';

export class EnemyDestroyedComponent {
  #scene;
  #group;
  #eventBusComponent;

  constructor(scene, eventBusComponent) {
    this.#scene = scene;
    this.#eventBusComponent = eventBusComponent;

    this.#group = this.#scene.add.group({
      name: `${this.constructor.name}-${Phaser.Math.RND.uuid()}`,
    });

    this.#eventBusComponent.on(CUSTOM_EVENTS.ENEMY_DESTROYED, (enemy) => {
      const gameObject = this.#group.get(enemy.x, enemy.y, enemy.shipAssetKey, 0);
      gameObject.play({
        key: enemy.shipDestroyedAnimationKey,
      });
    });
  }
}
