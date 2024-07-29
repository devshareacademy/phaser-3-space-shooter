export const CUSTOM_EVENTS = Object.freeze({
  ENEMY_INIT: 'ENEMY_INIT',
  ENEMY_DESTROYED: 'ENEMY_DESTROYED',
});

export class EventBusComponent extends Phaser.Events.EventEmitter {
  constructor() {
    super();
  }
}
