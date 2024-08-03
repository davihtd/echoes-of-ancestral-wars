import type { Tiles } from '../../../types/tiled/helpers';
import type { MapDataLayer, ObjectElement } from '../../../types/tiled/Map';
import Element from '../../Element';
import type Map from './Map';


export default class CanvasLayer extends Element<'canvas'> {
  readonly map: Map;
  readonly context: CanvasRenderingContext2D;

  constructor(parent: HTMLElement, level: number, map: Map) {
    super('canvas', parent)

    this.map = map

    this._element.style.position = 'absolute';
    this._element.style.zIndex = `${level}`;
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
    if (!layer.data) console.warn('No element data found')
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
      ...inTileCoordinates,
      ...tileset.tileDimensions,
      ...inMapCoordinates,
      ...tileset.tileDimensions
    )
  }
}
