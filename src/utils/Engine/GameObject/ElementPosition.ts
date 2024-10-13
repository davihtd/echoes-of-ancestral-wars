import getUnitAsNumber from "../utils";

export default class ElementPosition {
  constructor(public _element: HTMLElement) {}

  public get x(): number {
    return getUnitAsNumber(this._element.style.left, "px");
  }
  public set x(value: number) {
    this._element.style.left = `${value}px`;
  }

  public get y(): number {
    return getUnitAsNumber(this._element.style.top, "px");
  }
  public set y(value: number) {
    this._element.style.top = `${value}px`;
  }
}
