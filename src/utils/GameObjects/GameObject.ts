export default class GameObject {
  constructor(element: HTMLElement, x: number, y: number, width: number, height: number) {
    element.style.position = 'absolute'

    this.#element = element
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  #element: HTMLElement;

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

