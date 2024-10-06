export type DimensionsObject = { width: number; height: number };
export type DimensionsTuple = [width: number, height: number];

export default class Dimensions {
  private dimensions: DimensionsTuple;

  constructor(dimensions: DimensionsTuple | DimensionsObject) {
    if (Array.isArray(dimensions)) {
      this.dimensions = dimensions;
    } else {
      this.dimensions = [dimensions.width, dimensions.height];
    }
  }

  get width(): number {
    return this.dimensions[0];
  }

  get height(): number {
    return this.dimensions[1];
  }

  get asArray(): DimensionsTuple {
    return this.dimensions;
  }
}
