/**
 * A simple component for keeping track of the health of a game object.
 * @type {import('../../types/typedef.js').HealthComponent}
 */
export class HealthComponent {
  /** @type {number} */
  #startingLife;
  /** @type {number} */
  #currentLife;
  /** @type {boolean} */
  #isDead;

  /**
   * @param {number} life
   */
  constructor(life) {
    this.#startingLife = life;
    this.#currentLife = life;
    this.#isDead = false;
  }

  /** @type {number} */
  get life() {
    return this.#currentLife;
  }

  /** @type {boolean} */
  get isDead() {
    return this.#isDead;
  }

  /**
   * @returns {void}
   */
  reset() {
    this.#currentLife = this.#startingLife;
    this.#isDead = false;
  }

  /**
   *
   * @returns {void}
   */
  hit() {
    if (this.#isDead) {
      return;
    }

    this.#currentLife -= 1;
    if (this.#currentLife <= 0) {
      this.#isDead = true;
    }
  }

  /**
   * @returns {void}
   */
  die() {
    this.#currentLife = 0;
    this.#isDead = true;
  }
}
