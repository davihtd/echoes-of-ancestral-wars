import Element from '../../Element';
import getUnitAsNumber from '../utils';
import Dimensions from './Dimensions';
import Position from './Position';


interface Options {
  x?: number
  y?: number
  width?: number
  height?: number
}

export default class GameObject<Tag extends keyof HTMLElementTagNameMap> extends Element<Tag> {
  readonly position: Position;
  readonly dimensions: Dimensions;

  constructor(tagName: Tag, parent: HTMLElement, options: Options = {}) {
    super(tagName, parent);
    this._element.style.position = 'absolute'

    this.position = new Position(this._element)
    this.dimensions = new Dimensions(this._element)

    if (options.x) this.position.x = options.x
    if (options.y) this.position.y = options.y
    if (options.width) this.dimensions.width = options.width
    if (options.height) this.dimensions.height = options.height
  }

  public get rotation() {
    return getUnitAsNumber(this._element.style.rotate, 'deg')
  }
  public set rotation(value) {
    this._element.style.rotate = `${value}deg`
  }

  setDebugMode(active: boolean, objectName: string) {
    if (active) {
      this._element.style.border = '1px solid red'
      this._element.style.fontSize = '.4rem'
      this._element.innerText = objectName
    } else {
      this._element.style.border = ''
      this._element.style.fontSize = ''
      this._element.innerText = ''
    }
  }
}



