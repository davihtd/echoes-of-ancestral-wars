import Element from "../../Element";
import getUnitAsNumber from "../utils";

export type GameObjectOptions = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export default class GameObject<
  Tag extends keyof HTMLElementTagNameMap = keyof HTMLElementTagNameMap
> extends Element<Tag> {

  constructor(tagName: Tag, parent: HTMLElement, options: GameObjectOptions = {}) {
    super(tagName, parent);
    this._element.style.position = "absolute";

    if (options.x) this.elementPosition.x = options.x;
    if (options.y) this.elementPosition.y = options.y;
    if (options.width) this.elementDimensions.width = options.width;
    if (options.height) this.elementDimensions.height = options.height;
  }
}
