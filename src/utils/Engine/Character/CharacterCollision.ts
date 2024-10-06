import type { Axis } from '../../../types/helpers';
import type ElementDimensions from '../GameObject/ElementDimensions';
import type MapCollisions from '../MapManager/MapCollisions';
import CollisionBox from '../Utils/CollisionBox';
import Point from '../Utils/Point';

export default class CharacterCollision extends CollisionBox {
  #mapCollisions: MapCollisions;

  constructor(position: Point, dimensions: ElementDimensions, mapCollisions: MapCollisions) {
    super(position, dimensions)
    this.#mapCollisions = mapCollisions
  }

  isCollisionMovingTo(axis: Axis, toMove: number): boolean {
    const toAdd = this.topLeftCorner[axis]
    
    this.addToAxis(axis, toMove)

    const collisions = this.#mapCollisions.getNearCollisions(this)

    const collisionWasDetected = collisions.some(collision => {
      return this.isCollidingCollision(collision)
    })

    if (collisionWasDetected) {
      this.addToAxis(axis, -toMove)
    }

    return collisionWasDetected
  }

  addToAxis(axis: Axis, value: number) {
    this.topLeftCorner[axis] += value
    this.bottomRightCorner[axis] += value
  }
}