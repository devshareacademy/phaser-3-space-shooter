export const CUSTOM_EVENTS = Object.freeze({
  ENEMY_INIT: 'ENEMY_INIT',
  ENEMY_DESTROYED: 'ENEMY_DESTROYED',
  PLAYER_SPAWN: 'PLAYER_SPAWN',
  PLAYER_DESTROYED: 'PLAYER_DESTROYED',
  GAME_OVER: 'GAME_OVER',
  SHIP_HIT: 'SHIP_HIT',
  SHIP_SHOOT: 'SHIP_SHOOT',
});

/**
 * Uses the native Phaser 3 EventEmitter class to allow communication
 * between the various components in our game.
 *
 * For example, this event bus can be used for notifying the UI when
 * an enemy is destroyed so we can update the score in our game.
 */
export class EventBusComponent extends Phaser.Events.EventEmitter {
  constructor() {
    super();
  }
}
