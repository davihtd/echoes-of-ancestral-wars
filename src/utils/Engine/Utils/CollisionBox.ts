import { Axis } from "../../../types/helpers";
import type { Object } from "../../../types/tiled/Tileset";
import Box from "./Box";
import Point from "./Point";

type PointCollisionResult = {
  inX: boolean;
  inY: boolean;
};

export default class CollisionBox extends Box {
  constructor(position: Point, dimensions: Pick<Object, "width" | "height">) {
    const bottomRightCorner = Box.getBottomRightCornerFromDimensions(
      position,
      dimensions
    );

    super(position, bottomRightCorner);
  }

  private inRange(range: [number, number], target: number) {
    if (target > range[0]) return target < range[1];
    if (target < range[0]) return target > range[1];
    else return false;
  }

  private inAxis(axis: Axis, point: Point) {
    return this.inRange(
      [this.topLeftCorner[axis], this.bottomRightCorner[axis]],
      point[axis]
    );
  }

  /**Retorna verdadero si el punto esta colisionando con esta caja*/
  isCollidingPoint(point: Point): PointCollisionResult {
    const inX = this.inAxis(Axis.X, point);
    const inY = this.inAxis(Axis.Y, point);

    return { inX, inY };
  }

  /**Retorna verdadero si la caja esta colisionando con esta caja */
  isCollidingCollision(collision: CollisionBox) {
    const cornersCollidingR = {
      topRight: this.isCollidingPoint(collision.topRightCorner),
      topLeft: this.isCollidingPoint(collision.topLeftCorner),
      bottomRight: this.isCollidingPoint(collision.bottomRightCorner),
      bottomLeft: this.isCollidingPoint(collision.bottomLeftCorner),
    };

    // retorna verdadero si cualquier esquina esta colisionando
    const someCornerIsColliding = Object.values(cornersCollidingR).some(
      (isColliding) => isColliding.inX && isColliding.inY
    );

    /**si la colisione es mas pequeña que esta caja, 
     * entonces hay que calcularlo diferente */
    const isInverseCollision = () => {
      const cornersCollidingR = {
        topRight: collision.isCollidingPoint(this.topRightCorner),
        topLeft: collision.isCollidingPoint(this.topLeftCorner),
        bottomRight: collision.isCollidingPoint(this.bottomRightCorner),
        bottomLeft: collision.isCollidingPoint(this.bottomLeftCorner),
      };

      return Object.values(cornersCollidingR).some(
        (isColliding) => isColliding.inX && isColliding.inY
      );
    };

    return someCornerIsColliding || isInverseCollision();
  }
}
