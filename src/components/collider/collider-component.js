import { CUSTOM_EVENTS } from '../events/event-bus-component.js';

export class ColliderComponent {
  #lifeComponent;
  #eventBusComponent;

  constructor(lifeComponent, eventBusComponent) {
    this.#lifeComponent = lifeComponent;
    this.#eventBusComponent = eventBusComponent;
  }

  collideWithEnemyShip() {
    if (this.#lifeComponent.isDead) {
      return;
    }
    this.#lifeComponent.die();
  }

  collideWithEnemyProjectile() {
    if (this.#lifeComponent.isDead) {
      return;
    }
    this.#lifeComponent.hit();
    this.#eventBusComponent.emit(CUSTOM_EVENTS.SHIP_HIT);
  }
}
