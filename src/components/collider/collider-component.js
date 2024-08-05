import { CUSTOM_EVENTS } from '../events/event-bus-component.js';

export class ColliderComponent {
  #healthComponent;
  #eventBusComponent;

  constructor(healthComponent, eventBusComponent) {
    this.#healthComponent = healthComponent;
    this.#eventBusComponent = eventBusComponent;
  }

  collideWithEnemyShip() {
    if (this.#healthComponent.isDead) {
      return;
    }
    this.#healthComponent.die();
  }

  collideWithEnemyProjectile() {
    if (this.#healthComponent.isDead) {
      return;
    }
    this.#healthComponent.hit();
    this.#eventBusComponent.emit(CUSTOM_EVENTS.SHIP_HIT);
  }
}
