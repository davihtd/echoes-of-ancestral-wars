/**@todo GameObject debería usar esto */
export default class Position {
  _element: HTMLElement;

  constructor (element: HTMLElement) {
    this._element = element
  }

  #getUnitAsNumber(value: string, unit: 'px' | 'deg'): number {
    return Number(value.slice(0, -unit.length))
  }

  public get x(): number {
    return this.#getUnitAsNumber(this._element.style.left, 'px')
  }
  public set x(value: number) {
    this._element.style.left = `${value}px`
  }

  public get y(): number {
    return this.#getUnitAsNumber(this._element.style.top, 'px')
  }
  public set y(value: number) {
    this._element.style.top = `${value}px`
  }
}