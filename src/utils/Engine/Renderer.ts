
type UpdateCallback = () => void

class Renderer {
  #executionID: number | null = null;
  #lastRegisteredTime = 0;
  #fps = 0;
  #updateCallback: UpdateCallback = () => {};
  

  /**
   * Inicia el juego
   * @param currentTime Es el tiempo desde que se ejecuto requestAnimationFrame frame por primera vez
   */
  startGame(currentTime: DOMHighResTimeStamp = 0) {
    this.#executionID = requestAnimationFrame(this.startGame)
    this.#updateFPS(currentTime)

    this.#updateCallback()
  }

  stopGame() {
    if (typeof this.#executionID != 'number') throw new Error("The game can't be stopped because it didn't start")
    cancelAnimationFrame(this.#executionID)
  }

  public get fps() {
    return this.#fps;
  }

  #updateFPS(currentTime: number) {
    this.#fps++;

    const millisecondsFromLastExecution = currentTime - this.#lastRegisteredTime
    if (millisecondsFromLastExecution > 999) {
      this.#lastRegisteredTime = currentTime
      this.#fps = 0
    }
  }

  onFrameChange(callback: UpdateCallback) {
    this.#updateCallback = callback
  }
}

export default new Renderer()