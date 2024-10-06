import { Axis } from "../../../types/helpers";
import type { Object } from "../../../types/tiled/Tileset";
import Box from "../Utils/Box";
import Point from "../Utils/Point";

export default class CollisionBox extends Box {
  constructor(
    tileCoordinates: Point,
    object: Pick<Object, "x" | "y" | "width" | "height">
  ) {
    const topLeftCorner = new Point({
      x: tileCoordinates.x + object.x,
      y: tileCoordinates.y + object.y,
    });

    const bottomRightCorner = Box.getBottomRightCornerFromDimensions(
      topLeftCorner,
      object
    );

    super(topLeftCorner, bottomRightCorner);
  }

  private inRange(range: [number, number], target: number) {
    if (target > range[0]) return target < range[1];
    if (target < range[0]) return target > range[1];
  }

  private inAxis(axis: Axis, point: Point) {
    return this.inRange(
      [this.topLeftCorner[axis], this.bottomRightCorner[axis]],
      point[axis]
    );
  }

  /**Retorna verdadero si el punto esta colisionando con esta caja*/
  isCollidingPoint(point: Point) {
    const inX = this.inAxis(Axis.X, point);
    const inY = this.inAxis(Axis.Y, point);

    return inX && inY;
  }

  /**Retorna verdadero si la caja esta colisionando con esta caja */
  isCollidingCollision(collisions: CollisionBox) {
    const colliding = {
      topRight: this.isCollidingPoint(collisions.topRightCorner),
      topLeft: this.isCollidingPoint(collisions.topLeftCorner),
      bottomRight: this.isCollidingPoint(collisions.bottomRightCorner),
      bottomLeft: this.isCollidingPoint(collisions.bottomLeftCorner),
    };

    // retorna verdadero si cualquier esquina esta colisionando
    return Object.values(colliding).some((value) => value);
  }
}
