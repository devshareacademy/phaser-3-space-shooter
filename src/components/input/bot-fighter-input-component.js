import { InputComponent } from './input-component.js';

/**
 * A custom `InputComponent` that is used for the `Fighter` enemy
 * type. This class is responsible for building out the simple AI
 * that will be used for moving the enemy game object in the game.
 *
 * For the `Fighter` enemy, the enemy will just moved in a straight
 * path down the screen and will fire their weapon.
 */
export class BotFighterInputComponent extends InputComponent {
  constructor() {
    super();
    this._down = true;
    this._shoot = true;
  }

  update() {
    //
  }
}
