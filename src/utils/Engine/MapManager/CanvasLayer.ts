import type { Tiles } from '../../../types/tiled/helpers';
import type { MapDataLayer, ObjectElement } from '../../../types/tiled/Map';
import Element from '../../Element';
import type Map from './Map';


export default class CanvasLayer extends Element<'canvas'> {
  readonly context: CanvasRenderingContext2D;

  constructor(parent: HTMLElement, level: number, readonly map: Map) {
    super('canvas', parent)

    this.map = map

    const style = this._element.style
    style.position = 'absolute'
    style.zIndex = `${level}`
    style.imageRendering = 'pixelated'
    this._element.width = map.data.pxWidth
    this._element.height = map.data.pxHeight

    const ctx = this._element.getContext('2d');

    if (!ctx) throw new Error("Can't create 2D context");

    this.context = ctx;
  }

  drawTileLayerGroup(layerGroup: MapDataLayer) {
    if (!layerGroup.layers) throw new Error('There are not subLayers');

    layerGroup.layers.forEach(layer => {
      this.drawTileLayer(layer)
    })
  }

  private drawTileLayer(layer: ObjectElement) {
    if (!layer.data) console.warn('No layer data found')
    
    layer.data?.forEach((globalID, tileIndex) => {
      if (!globalID) return;
      this.drawTile(globalID, layer.width, tileIndex)
    })
  }

  private drawTile(globalID: number, layerWidth: Tiles, tileIndex: number) {
    const tileset = this.map.getTilesetSelector(globalID)
    const inTileCoordinates = tileset.getTileCoordinates(globalID)
    const inMapCoordinates = this.map.getTileCoordinates(layerWidth, tileIndex)

    this.context.drawImage(
      tileset.img,
      ...inTileCoordinates.coordinates,
      ...tileset.tileDimensions.asArray,
      ...inMapCoordinates.coordinates,
      ...tileset.tileDimensions.asArray
    )
  }
}
