type Callback = () => void


export default class FPSController {
  private static executionID: null | number = null;
  private static lastRegisteredTimeAfterSecond = 0;
  private static lastRegisteredTime = 0;
  private static events: Callback[] = [];
  
  private static _currentFrame = 0;
  /** @deprecated Ya no hay razón para que sea publico. Solo hace falta eliminar getDebouncedFn */
  public static get currentFrame() {
    return FPSController._currentFrame;
  }
  private static _FPS = 0;
  /** FramesPerSecond - FotogramasPorSegundo */
  public static get FPS() {
    return FPSController._FPS;
  }

  private static _delta: number = 0;
  /** Delta se refiere a una diferencia de dos valores. En este caso es la diferencia de tiempo entre
   * dos fotogramas en segundos. Para que el movimiento de cualquier objeto del juego sea suave 
   * independientemente de la tasa de fotogramas puedes multiplicar delta por el valor de movimiento.
   * @example 
   *  Player.moveRight(200 * FPSController.delta)
   * // Player se moverá a 200 unidades por segundo
   */
  public static get delta(): number {
    return FPSController._delta;
  }

  static startGame(currentTime: DOMHighResTimeStamp = 0) {
    FPSController._delta = (currentTime - FPSController.lastRegisteredTime) / 1000
    FPSController.lastRegisteredTime = currentTime
    FPSController.executionID = requestAnimationFrame(FPSController.startGame)
    FPSController.updateFPS(currentTime)
    FPSController.events.forEach(event => event())
  }

  private static updateFPS = (currentTime: number) => {
    FPSController._currentFrame++;

    const oneSecond = 999
    const millisecondsFromLastExecution = currentTime - FPSController.lastRegisteredTimeAfterSecond
    if (millisecondsFromLastExecution > oneSecond) {
      FPSController.lastRegisteredTimeAfterSecond = currentTime
      FPSController._FPS = FPSController.currentFrame
      FPSController._currentFrame = 0
    }
  }

  static stopGame() {
    if (typeof this.executionID != 'number') return;
    cancelAnimationFrame(this.executionID)
    this.executionID = null
    this.lastRegisteredTimeAfterSecond = 0
    this._FPS = 0
    this._currentFrame = 0
  }

  static addEvent(event: Callback) {
    this.events.push(event)
  }
}


/** @deprecated Mejor usa FPSController.delta */
export function getDebouncedFn(fn: Callback): Callback {
  let prevFrame: null | number = null;
  return () => {
    if (prevFrame == FPSController.currentFrame) return;
    prevFrame = FPSController.currentFrame;
    fn()
  }
}