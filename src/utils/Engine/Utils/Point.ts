import type { Axis } from '../../../types/helpers';

export type CoordinatesObject = Record<Axis, number>;
export type CoordinatesTuple = [x: number, y: number];

export default class Point {
  coordinates: CoordinatesTuple;

  constructor(coordinates: CoordinatesTuple | CoordinatesObject) {
    if (Array.isArray(coordinates)) {
      this.coordinates = coordinates
    } else {
      this.coordinates = [coordinates.x, coordinates.y]
    }
  }

  get x(): number {
    return this.coordinates[0]
  }

  get y(): number {
    return this.coordinates[1]
  }

  set x(value: number) {
    this.coordinates[0] = value
  }

  set y(value: number) {
    this.coordinates[1] = value
  }
}