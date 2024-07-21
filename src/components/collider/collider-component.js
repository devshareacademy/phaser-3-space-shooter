export class ColliderComponent {
  #lifeComponent;

  constructor(lifeComponent) {
    this.#lifeComponent = lifeComponent;
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
  }
}
