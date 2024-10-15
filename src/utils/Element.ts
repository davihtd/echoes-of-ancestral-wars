import ElementDimensions from "./Engine/GameObject/ElementDimensions";
import ElementPosition from "./Engine/GameObject/ElementPosition";
import getUnitAsNumber from "./Engine/utils";

export default class Element<Tag extends keyof HTMLElementTagNameMap> {
  elementPosition: ElementPosition;
  elementDimensions: ElementDimensions;

  constructor(
    tagName: Tag,
    parent: HTMLElement,
    readonly _element: HTMLElementTagNameMap[Tag] = document.createElement<Tag>(
      tagName
    )
  ) {
    this.elementPosition = new ElementPosition(this._element);
    this.elementDimensions = new ElementDimensions(this._element);

    parent.appendChild(this._element);
  }

  appendChild(child: Element<any>) {
    this._element.appendChild(child._element);
  }

  get rotation() {
    return getUnitAsNumber(this._element.style.rotate, "deg");
  }
  set rotation(value) {
    this._element.style.rotate = `${value}deg`;
  }

  setDebugMode(active: boolean, objectName: string | null) {
    if (active) {
      this._element.style.border = "1px solid red";
      this._element.style.fontSize = ".4rem";
      if (objectName) this._element.innerText = objectName;
    } else {
      this._element.style.border = "";
      this._element.style.fontSize = "";
      if (this._element.innerText) this._element.innerText = "";
    }
  }

  /**
   * Get element from dom by selector string
   * @example
   * 	const elementClass = Element.get('.my-class')
   * 	const elementId = Element.get('#my-id')
   * @param selector
   * @param context
   * @returns  HTMLElement
   */
  static get<T extends HTMLElement>(
    selector: string,
    context: Document | HTMLElement = document
  ) {
    const $element = context.querySelector<T>(selector);
    if (!$element) throw new Error(`Element "${selector}" not found`);
    return $element;
  }

  /**
   * Get elements from dom by selector string
   * @example
   * 	const elements = Element.getAll('.my-class')
   * @param selector
   * @param context
   * @returns  NodeList
   */
  static getAll<T extends HTMLElement>(
    selector: string,
    context: Document | HTMLElement = document
  ) {
    return context.querySelectorAll<T>(selector);
  }
}
