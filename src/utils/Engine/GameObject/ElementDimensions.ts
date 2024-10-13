import getUnitAsNumber from '../utils';



export default class ElementDimensions {
  constructor (public _element: HTMLElement) {}

  public get width(): number {
    return getUnitAsNumber(this._element.style.width, 'px')
  }
  public set width(value: number) {
    this._element.style.width = `${value}px`
  }

  public get height(): number {
    return getUnitAsNumber(this._element.style.height, 'px')
  }
  public set height(value: number) {
    this._element.style.height = `${value}px`
  }
}