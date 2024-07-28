export class HealthComponent {
  #startingLife;
  #currentLife;
  #isDead;

  constructor(life) {
    this.#startingLife = life;
    this.#currentLife = life;
    this.#isDead = false;
  }

  get life() {
    return this.#currentLife;
  }

  get isDead() {
    return this.#isDead;
  }

  reset() {
    this.#currentLife = this.#startingLife;
    this.#isDead = false;
  }

  hit() {
    if (this.#isDead) {
      return;
    }

    this.#currentLife -= 1;
    if (this.#currentLife <= 0) {
      this.#isDead = true;
    }
  }

  die() {
    this.#currentLife = 0;
    this.#isDead = true;
  }
}
