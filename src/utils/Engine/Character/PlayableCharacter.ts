import FPSController from '../FPSController';
import Character, { type CharacterStats } from './Character';


export type PlayableCharacterStats = CharacterStats & {
  walkingSpeed: number
  runningSpeed: number
}

export default class PlayableCharacter extends Character {
  walkingSpeed: number;
  runningSpeed: number;

  #currentSpeed: number;

  constructor(layer: HTMLElement, stats: PlayableCharacterStats) {
    super(layer, stats)

    this.walkingSpeed = stats.walkingSpeed
    this.runningSpeed = stats.runningSpeed
    this.#currentSpeed = this.walkingSpeed
  }

  moveRight() {
    this.position.x += this.#currentSpeed * FPSController.delta
  }

  moveLeft() {
    this.position.x -= this.#currentSpeed * FPSController.delta
  }

  moveTop() {
    this.position.y -= this.#currentSpeed * FPSController.delta
  }

  moveBottom() {
    this.position.y += this.#currentSpeed * FPSController.delta
  }

  startRunning() {
    this.#currentSpeed = this.runningSpeed
  }

  stopRunning() {
    this.#currentSpeed = this.walkingSpeed
  }
}