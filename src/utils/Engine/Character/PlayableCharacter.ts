import type { CoordinatesObject } from '../Utils/Point';
import Character, { type CharacterStats } from './Character';
import Move from './Move';


export type PlayableCharacterStats = CharacterStats & {
  walkingSpeed: number
  runningSpeed: number
}

export default class PlayableCharacter extends Character {
  walkingSpeed: number;
  runningSpeed: number;
  move: Move;

  constructor(layer: HTMLElement, position: CoordinatesObject, stats: PlayableCharacterStats) {
    super(layer, position, stats)

    this.walkingSpeed = stats.walkingSpeed
    this.runningSpeed = stats.runningSpeed

    this.move = new Move(this.position, this.walkingSpeed)
  }

  startRunning() {
    this.move.speed = this.runningSpeed
  }

  stopRunning() {
    this.move.speed = this.walkingSpeed
  }
}