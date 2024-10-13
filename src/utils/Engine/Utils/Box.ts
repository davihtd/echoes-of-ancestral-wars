import type { DimensionsObject } from "./Dimensions";
import Point from "./Point";

export default class Box {
  get topRightCorner() {
    return new Point({
      x: this.bottomRightCorner.x,
      y: this.topLeftCorner.y,
    });
  }

  get bottomLeftCorner() {
    return new Point({
      x: this.topLeftCorner.x,
      y: this.bottomRightCorner.y,
    });
  }

  constructor(public topLeftCorner: Point, public bottomRightCorner: Point) {}

  static getBottomRightCornerFromDimensions(
    topLeftCorner: Point,
    dimension: DimensionsObject
  ): Point {
    return new Point({
      x: topLeftCorner.x + dimension.width,
      y: topLeftCorner.y + dimension.height,
    });
  }
}
