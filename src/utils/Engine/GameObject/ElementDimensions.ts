import getUnitAsNumber from '../utils';



export default class ElementDimensions {
  constructor (public _element: HTMLElement) {}

  get width(): number {
    return getUnitAsNumber(this._element.style.width, 'px')
  }
  set width(value: number) {
    this._element.style.width = `${value}px`
  }

  get height(): number {
    return getUnitAsNumber(this._element.style.height, 'px')
  }
  set height(value: number) {
    this._element.style.height = `${value}px`
  }

  get x() {
    return this.width
  }

  get y() {
    return this.height
  }
}