import type { BasicCallback } from '../../types/helpers';

class FPSController {
  private executionID: null | number = null;
  private lastRegisteredTimeAfterSecond = 0;
  private lastRegisteredTime = 0;
  private listeners: BasicCallback[] = [];

  private _gameIsRunning = false;
  public get gameIsRunning() {
    return this._gameIsRunning;
  }

  private currentFrame = 0;
  private _FPS = 0;
  /** FramesPerSecond - FotogramasPorSegundo */
  public get FPS() {
    return this._FPS;
  }

  private _delta: number = 0;
  /** Delta se refiere a una diferencia de dos valores. En este caso es la diferencia de tiempo entre
   * dos fotogramas en segundos. Para que el movimiento de cualquier objeto del juego sea suave 
   * independientemente de la tasa de fotogramas puedes multiplicar delta por el valor de movimiento.
   * @example 
   *  Player.moveRight(200 * FPSController.delta)
   * // Player se moverá a 200 unidades por segundo
   */
  public get delta(): number {
    return this._delta;
  }

  startGame(currentTime: DOMHighResTimeStamp = 0) {
    this._gameIsRunning = true
    this._delta = (currentTime - this.lastRegisteredTime) / 1000
    this.lastRegisteredTime = currentTime
    this.executionID = requestAnimationFrame(this.startGame.bind(this))
    this.updateFPS(currentTime)
    this.listeners.forEach(listener => listener())
  }

  private updateFPS = (currentTime: number) => {
    this.currentFrame++;

    const oneSecond = 999
    const millisecondsFromLastExecution = currentTime - this.lastRegisteredTimeAfterSecond
    if (millisecondsFromLastExecution > oneSecond) {
      this.lastRegisteredTimeAfterSecond = currentTime
      this._FPS = this.currentFrame
      this.currentFrame = 0
    }
  }

  stopGame() {
    if (this.executionID == null) return;
    this._gameIsRunning = false
    cancelAnimationFrame(this.executionID)
    this.executionID = null
    this.lastRegisteredTimeAfterSecond = 0
    this.currentFrame = 0
    this._FPS = 0
  }

  addEventListener(listener: BasicCallback) {
    this.listeners.push(listener)
  }
}

export default new FPSController()