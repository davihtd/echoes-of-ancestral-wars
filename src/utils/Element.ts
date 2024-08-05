export default class Element<Tag extends keyof HTMLElementTagNameMap> {
  readonly _element: HTMLElementTagNameMap[Tag];


  constructor(tagName: Tag, parent: HTMLElement) {
    this._element = document.createElement<Tag>(tagName)
    parent.appendChild(this._element)
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
    const $element = context.querySelector<T>(selector)
    if (!$element) throw new Error(`Element "${selector}" not found`)
    return $element
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
    return context.querySelectorAll<T>(selector)
  }
}