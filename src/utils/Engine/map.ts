import $ from "../dom-selector"

interface Layers {
    player: 5
  }
  class Map<T extends HTMLElement> {
    #element: T
    #layers: Layers = {
      player: 5
    }
  
    constructor(mapID: string) {
      this.#element = $(`#${mapID}`)
    }
  
    insertElement<T extends HTMLElement>(element: T, layer: keyof Layers) {
      this.#element.appendChild(element)
    }
  }
  
  export default new Map('map')