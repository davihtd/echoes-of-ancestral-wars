import { Axis } from "../../../types/helpers";
import FPSController from "../FPSController";
import type ElementPosition from "../GameObject/ElementPosition";
import type { CoordinatesObject } from "../Utils/Point";
import type CharacterCollision from "./CharacterCollision";

type PartialCoordinatesObj = Partial<CoordinatesObject>;
type Listener = (movement: PartialCoordinatesObj) => void;

export default class Move {
  #subscribers: Listener[] = [];

  constructor(
    private position: ElementPosition,
    public speed: number,
    private collision: CharacterCollision
  ) {}

  #move(axis: Axis, direction: 1 | -1) {
    const toAdd = this.speed * FPSController.delta * direction;

    const isCollision = this.collision.isCollisionMovingTo(axis, toAdd);

    if (isCollision) return;

    this.position[axis] += toAdd;
    this.notify({ [axis]: toAdd });
  }

  right() {
    this.#move(Axis.X, 1);
  }

  left() {
    this.#move(Axis.X, -1);
  }

  top() {
    this.#move(Axis.Y, -1);
  }

  bottom() {
    this.#move(Axis.Y, 1);
  }

  suscribe(listener: Listener) {
    this.#subscribers.push(listener);
  }

  notify(movement: PartialCoordinatesObj) {
    this.#subscribers.forEach((listener) => {
      listener(movement);
    });
  }
}
