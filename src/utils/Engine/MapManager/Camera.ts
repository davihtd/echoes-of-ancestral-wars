import type PlayableCharacter from '../Character/PlayableCharacter';
import FPSController from '../FPSController';
import type GameObject from '../GameObject/GameObject';
import type ElementPosition from '../GameObject/ElementPosition';


export default class Camera {
  position: ElementPosition
  zoom = 1

  constructor(position: ElementPosition) {
    this.position = position
  }

  moveRight(value: number) {
    this.position.x -= value * this.zoom
  }

  moveLeft(value: number) {
    this.position.x += value * this.zoom
  }

  moveTop(value: number) {
    this.position.y += value * this.zoom
  }

  moveBottom(value: number) {
    this.position.y -= value * this.zoom
  }

  follow(character: PlayableCharacter) {
    character.move.suscribe(movement => {
      this.moveRight(movement.x || 0)
      this.moveBottom(movement.y || 0)
    })
  }
}