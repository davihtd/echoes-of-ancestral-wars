import { Axis } from '../../../types/helpers';
import FPSController from '../FPSController';
import type Position from '../GameObject/Position';
import type { CoordinatesObject } from '../Utils/Point';


type PartialCoordinatesObj = Partial<CoordinatesObject>
type Listener = (movement: PartialCoordinatesObj) => void

export default class Move {
  speed: number
  #position: Position
  #subscribers: Listener[] = []

  constructor(position: Position, speed: number) {
    this.#position = position
    this.speed = speed
  }

  #move(axis: Axis, direction: 1 | -1) {
    const toAdd = this.speed * FPSController.delta * direction
    this.#position[axis] += toAdd
    this.notify({ [axis]: toAdd })
  }

  right() {
    this.#move(Axis.X, 1)
  }

  left() {
    this.#move(Axis.X, -1)
  }

  top() {
    this.#move(Axis.Y, -1)
  }

  bottom() {
    this.#move(Axis.Y, 1)
  }

  suscribe(listener: Listener) {
    this.#subscribers.push(listener)
  }

  notify(movement: PartialCoordinatesObj) {
    this.#subscribers.forEach(listener => {
      listener(movement)
    })
  }
}