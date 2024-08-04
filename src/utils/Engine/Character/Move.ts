import type { Vector2 } from '../../../types/helpers';
import FPSController from '../FPSController';
import type Position from '../GameObject/Position';


type PartialVector2 = Partial<Vector2>
type Listener = (movement: PartialVector2) => void

export default class Move {
  speed: number
  #position: Position
  #subscribers: Listener[] = []

  constructor(position: Position, speed: number) {
    this.#position = position
    this.speed = speed
  }

  #move(axis: keyof PartialVector2, direction: 1 | -1) {
    const toAdd = this.speed * FPSController.delta * direction
    this.#position[axis] += toAdd
    this.notify({ [axis]: toAdd })
  }

  right() {
    this.#move('x', 1)
  }

  left() {
    this.#move('x', -1)
  }

  top() {
    this.#move('y', -1)
  }

  bottom() {
    this.#move('y', 1)
  }

  suscribe(listener: Listener) {
    this.#subscribers.push(listener)
  }

  notify(movement: PartialVector2) {
    this.#subscribers.forEach(listener => {
      listener(movement)
    })
  }
}