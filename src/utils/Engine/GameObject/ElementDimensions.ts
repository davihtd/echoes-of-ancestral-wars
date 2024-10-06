import getUnitAsNumber from '../utils';



export default class ElementDimensions {
  _element: HTMLElement;

  constructor (element: HTMLElement) {
    this._element = element
  }

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