interface Options {
  x?: number
  y?: number
  width?: number
  height?: number
}

export default class GameObject<T extends HTMLElement> {
  constructor(element: T, options: Options = {}) {
    element.style.position = 'absolute'

    this.#element = element
    if (options.x) this.x = options.x
    if (options.y) this.y = options.y
    if (options.width) this.width = options.width
    if (options.height) this.height = options.height
  }

  #element: T

  #getStyleNumber(value: string, unit: 'px' | 'deg'): number {
    return Number(value.slice(0, -unit.length))
  }

  public get x(): number {
    return this.#getStyleNumber(this.#element.style.left, 'px')
  }
  public set x(value: number) {
    this.#element.style.left = `${value}px`
  }

  public get y(): number {
    return this.#getStyleNumber(this.#element.style.top, 'px')
  }
  public set y(value: number) {
    this.#element.style.top = `${value}px`
  }

  public get width(): number {
    return this.#getStyleNumber(this.#element.style.width, 'px')
  }
  public set width(value: number) {
    this.#element.style.width = `${value}px`
  }

  public get height(): number {
    return this.#getStyleNumber(this.#element.style.height, 'px')
  }
  public set height(value: number) {
    this.#element.style.height = `${value}px`
  }

  public get rotation() {
    return this.#getStyleNumber(this.#element.style.rotate, 'deg')
  }
  public set rotation(value) {
    this.#element.style.rotate = `${value}deg`
  }
}

