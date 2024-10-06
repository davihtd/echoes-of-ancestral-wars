import type { Object } from "../../../types/tiled/Tileset";
import CollisionBox from "../Utils/CollisionBox";
import Point from "../Utils/Point";

export default class MapCollision extends CollisionBox {
  constructor(
    tileCoordinates: Point,
    object: Pick<Object, "x" | "y" | "width" | "height">
  ) {
    const topLeftCorner = new Point({
      x: tileCoordinates.x + object.x,
      y: tileCoordinates.y + object.y,
    });

    super(topLeftCorner, object);
  }
}
