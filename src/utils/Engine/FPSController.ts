type Callback = () => void

/** 
 * - Si tiene _ es de uso interno
 * - El resto es de solo lectura
 */
const FPSController = {
  _executionID: null as null | number,
  _lastRegisteredTime: 0,
  currentFrame: 0,
  FPS: 0,
  events: [] as Callback[],
  startGame(currentTime: DOMHighResTimeStamp = 0) {
    const updateFPS = () => {
      FPSController.currentFrame++;

      const oneSecond = 999
      const millisecondsFromLastExecution = currentTime - FPSController._lastRegisteredTime
      if (millisecondsFromLastExecution > oneSecond) {
        FPSController._lastRegisteredTime = currentTime
        FPSController.FPS = FPSController.currentFrame
        FPSController.currentFrame = 0
      }
    }

    FPSController._executionID = requestAnimationFrame(FPSController.startGame)
    updateFPS()

    FPSController.events.forEach(event => event())
  },
  stopGame() {
    if (typeof FPSController._executionID != 'number') return;
    cancelAnimationFrame(FPSController._executionID)
    FPSController._executionID = null
    FPSController._lastRegisteredTime = 0
    FPSController.FPS = 0
    FPSController.currentFrame = 0
  },
  addEvent(event: Callback) {
    this.events.push(event)
  }
}

export default FPSController

/**Retorna la misma función pero modificada para que solo se ejecute una vez por fotograma */
export function getDebouncedFn(fn: Callback): Callback {
  let prevFrame: null | number = null;
  return () => {
    if (prevFrame == FPSController.currentFrame) return;
    prevFrame = FPSController.currentFrame;
    fn()
  }
}