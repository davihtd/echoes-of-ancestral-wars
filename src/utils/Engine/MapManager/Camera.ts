import type Position from '../Position';


export default class Camera {
  position: Position
  zoom = 1

  constructor(position: Position) {
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
}