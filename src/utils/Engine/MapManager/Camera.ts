import { Axis } from "../../../types/helpers";
import type PlayableCharacter from "../Character/PlayableCharacter";
import type ElementPosition from "../GameObject/ElementPosition";

export default class Camera {
  zoom = 1;

  constructor(
    private mapPosition: ElementPosition
  ) {}

  private move(axis: Axis, value: number) {
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
    const screenCases = {
      x: window.innerWidth,
      y: window.innerHeight,
    };

    const axisCases = {
      x: this.moveRight.bind(this),
      y: this.moveBottom.bind(this),
    }
    
    const centerCharacterOnAxis = (axis: Axis) => {
      axisCases[axis](character.position[axis] + character.dimensions[axis] / 2);
      this.mapPosition[axis] += screenCases[axis] / 2;
    };

    centerCharacterOnAxis(Axis.X);
    centerCharacterOnAxis(Axis.Y);

    character.move.suscribe((movement) => {
      this.moveRight(movement.x || 0);
      this.moveBottom(movement.y || 0);
    });
  }
}
