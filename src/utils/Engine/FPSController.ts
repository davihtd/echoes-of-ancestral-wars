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
  },
  addEvent(event: Callback) {
    this.events.push(event)
  }
}

export default FPSController