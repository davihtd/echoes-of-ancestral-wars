import type { Axis } from "../../../types/helpers";
import type ElementDimensions from "../GameObject/ElementDimensions";
import type MapCollisions from "../MapManager/MapCollisions";
import CollisionBox from "../Utils/CollisionBox";
import Point from "../Utils/Point";

export default class CharacterCollision extends CollisionBox {
  constructor(
    position: Point,
    dimensions: ElementDimensions,
    private mapCollisions: MapCollisions
  ) {
    super(position, dimensions);
  }

  isCollisionMovingTo(axis: Axis, toMove: number): boolean {
    this.addToAxis(axis, toMove);

    const collisions = this.mapCollisions.getNearCollisions(this);

    const collisionWasDetected = collisions.some((mapCollision) => {
      return this.isCollidingCollision(mapCollision);
    });

    if (collisionWasDetected) {
      this.addToAxis(axis, -toMove);
    }

    return collisionWasDetected;
  }

  addToAxis(axis: Axis, value: number) {
    this.topLeftCorner[axis] += value;
    this.bottomRightCorner[axis] += value;
  }
}
