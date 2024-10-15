import { Layers } from "../constants";
import GameObject, { type GameObjectOptions } from "../GameObject/GameObject";

export type CharacterStats = {
  health: number;
  strength: number;
  intelligence: number;
};

export type CharacterElementRequiredParams = Required<Pick<GameObjectOptions, 'height' | 'width' | 'x' | 'y'>>

export default class Character extends GameObject<"div"> {
  constructor(
    layer: HTMLElement,
    element: CharacterElementRequiredParams,
    public stats: CharacterStats
  ) {
    super("div", layer, element);

    this._element.style.zIndex = Layers.CHARACTER.toString();
  }
}
