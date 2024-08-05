/**
 * @typedef AnimationConfig
 * @type {object}
 * @property {string} key
 * @property {number[]} [frames]
 * @property {number} frameRate
 * @property {number} repeat
 * @property {string} assetKey
 */

/**
 * @typedef AssetJson
 * @type {AnimationConfig[]}
 */

/**
 * @typedef ColliderComponent
 * @type {object}
 * @property {() => void} collideWithEnemyShip
 * @property {() => void} collideWithEnemyProjectile
 */

/**
 * @typedef HealthComponent
 * @type {object}
 * @property {() => void} reset
 * @property {() => void} hit
 * @property {() => void} die
 * @property {number} life
 * @property {boolean} isDead
 */

/**
 * @typedef BaseEnemy
 * @type {object}
 * @property {ColliderComponent} colliderComponent
 * @property {() => void} reset
 * @property {HealthComponent} healthComponent
 * @property {(eventBusComponent: Phaser.Events.EventEmitter) => void} init
 * @property {string} shipAssetKey
 * @property {string} shipDestroyedAnimationKey
 *
 * @typedef {Phaser.GameObjects.Container & BaseEnemy} Enemy
 */

/**
 * @param {Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody} body
 * @returns {body is Phaser.Physics.Arcade.Body}
 */
export function isSpriteWithDynamicBody(body) {
  return body.physicsType === Phaser.Physics.Arcade.DYNAMIC_BODY;
}
