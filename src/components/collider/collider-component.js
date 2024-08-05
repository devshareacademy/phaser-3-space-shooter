import { CUSTOM_EVENTS, EventBusComponent } from '../events/event-bus-component.js';
import { HealthComponent } from '../health/health-component.js';

/**
 * A simple component for handling when collisions between two different
 * game objects in our game.
 * @type {import('../../types/typedef.js').ColliderComponent}
 */
export class ColliderComponent {
  /** @type {HealthComponent} */
  #healthComponent;
  /** @type {EventBusComponent} */
  #eventBusComponent;

  /**
   * @param {HealthComponent} healthComponent
   * @param {EventBusComponent} eventBusComponent
   */
  constructor(healthComponent, eventBusComponent) {
    this.#healthComponent = healthComponent;
    this.#eventBusComponent = eventBusComponent;
  }

  /**
   * @returns {void}
   */
  collideWithEnemyShip() {
    if (this.#healthComponent.isDead) {
      return;
    }
    this.#healthComponent.die();
  }

  /**
   * @returns {void}
   */
  collideWithEnemyProjectile() {
    if (this.#healthComponent.isDead) {
      return;
    }
    this.#healthComponent.hit();
    this.#eventBusComponent.emit(CUSTOM_EVENTS.SHIP_HIT);
  }
}
