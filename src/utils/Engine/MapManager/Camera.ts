import { Axis } from "../../../types/helpers";
import type PlayableCharacter from "../Character/PlayableCharacter";
import type ElementPosition from "../GameObject/ElementPosition";
import type Dimensions from "../Utils/Dimensions";

export default class Camera {
  private mapPosition: ElementPosition;
  private readonly mapDimensions: Dimensions;
  zoom = 1;

  constructor(mapPosition: ElementPosition, mapDimensions: Dimensions) {
    this.mapPosition = mapPosition;
    this.mapDimensions = mapDimensions;
  }

  /**
   * retorna verdadero si la posición de la cámara está dentro del limite de la pantalla
   * @param axis x o y
   * @param position la posición a evaluar
   * @returns {{boolean}}
   */
  isAtLimit(axis: Axis, positiveDirection: boolean): boolean {
    if (!positiveDirection) {
      const screenSize = {
        x: window.innerWidth,
        y: window.innerHeight,
      };

      const positionInAxis =
        -this.mapPosition[axis] + screenSize[axis];

      const limit = this.mapDimensions[axis] * this.zoom;

      return positionInAxis >= limit;
    } else {
      const positionInAxis = this.mapPosition[axis];
      return positionInAxis > 0;
    }
  }

  private move(axis: Axis, value: number) {
    const isAtLimit = this.isAtLimit(axis, value > 0);
    if (isAtLimit) return;
    this.mapPosition[axis] += value * this.zoom;
  }

  moveRight(value: number) {
    this.move(Axis.X, -value);
  }

  moveLeft(value: number) {
    this.move(Axis.X, value);
  }

  moveTop(value: number) {
    this.move(Axis.Y, value);
  }

  moveBottom(value: number) {
    this.move(Axis.Y, -value);
  }

  follow(character: PlayableCharacter) {
    character.move.suscribe((movement) => {
      this.moveRight(movement.x || 0);
      this.moveBottom(movement.y || 0);
    });
  }
}
