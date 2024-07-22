interface Options {
  x?: number
  y?: number
  width?: number
  height?: number
}

export default class GameObject<T extends HTMLElement> {
  constructor(element: T, options: Options = {}) {
    element.style.position = 'absolute'

    this._element = element
    if (options.x) this.x = options.x
    if (options.y) this.y = options.y
    if (options.width) this.width = options.width
    if (options.height) this.height = options.height
  }

  _element: T

  #getStyleNumber(value: string, unit: 'px' | 'deg'): number {
    return Number(value.slice(0, -unit.length))
  }

  public get x(): number {
    return this.#getStyleNumber(this._element.style.left, 'px')
  }
  public set x(value: number) {
    this._element.style.left = `${value}px`
  }

  public get y(): number {
    return this.#getStyleNumber(this._element.style.top, 'px')
  }
  public set y(value: number) {
    this._element.style.top = `${value}px`
  }

  public get width(): number {
    return this.#getStyleNumber(this._element.style.width, 'px')
  }
  public set width(value: number) {
    this._element.style.width = `${value}px`
  }

  public get height(): number {
    return this.#getStyleNumber(this._element.style.height, 'px')
  }
  public set height(value: number) {
    this._element.style.height = `${value}px`
  }

  public get rotation() {
    return this.#getStyleNumber(this._element.style.rotate, 'deg')
  }
  public set rotation(value) {
    this._element.style.rotate = `${value}deg`
  }
}

