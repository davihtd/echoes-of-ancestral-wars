import type { DimensionsObject } from "./Dimensions";
import Point from "./Point";

export default class Box {
  topLeftCorner: Point;
  bottomRightCorner: Point;

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

  constructor(topLeftCorner: Point, bottomRightCorner: Point) {
    this.topLeftCorner = topLeftCorner;
    this.bottomRightCorner = bottomRightCorner;
  }

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
