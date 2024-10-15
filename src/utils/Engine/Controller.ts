import type { BasicCallback } from '../../types/helpers';
import FPSController from './FPSController';

class Controller {
  readonly activeKeys: Set<string>;
  /**Donde la clave es un teclado y basic callback un listener */
  #listeners: Record<string, BasicCallback> = {}

  constructor () {
    this.activeKeys = new Set()

    window.addEventListener('keydown', e => {
      this.activeKeys.add(e.key.toLowerCase())
    })

    window.addEventListener('keyup', e => {
      this.activeKeys.delete(e.key.toLowerCase())
    })

    FPSController.addEventListener(() => this.#triggerListeners())
  }

  setKeyDownEventListener(key: string, listener: BasicCallback) {
    this.#listeners[key.toLowerCase()] = listener
  }

  setKeyUpEventListener(key: string, listener: BasicCallback) {
    window.addEventListener('keyup', e => {
      if (e.key.toLowerCase() != key.toLowerCase()) return;
      listener()
    })
  }

  #triggerListeners() {
    this.activeKeys.forEach(key => {
      const listener = this.#listeners[key]

      if (!listener) return;
      listener()
    })
  }
}

export default new Controller()