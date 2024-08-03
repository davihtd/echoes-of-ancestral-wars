import Element from '../../Element';
import Camera from './Camera';
import Position from '../GameObject/Position';
import CanvasLayer from './CanvasLayer';
import type Map from './Map';
import MapDataLoader from './MapDataLoader';
import GameObject from '../GameObject/GameObject';


type CanvasLayers = {
  background: CanvasLayer
  foreground: CanvasLayer
}

export default class MapManager extends GameObject<'div'> {
  private layers: CanvasLayers | null = null
  readonly camera: Camera;

  constructor(mapContainerID: string, mapDataPath: string) {
    const $mapContainer = Element.get('#' + mapContainerID)
    super('div', $mapContainer)
    
    this._element.style.position = 'fixed'

    this.camera = new Camera(this.position)
    this.zoom = 2.5

    new MapDataLoader(mapDataPath, map => this.#loadMap(map))
  }

  get zoom() {
    return Number(this._element.style.scale)
  }

  set zoom(value: number) {
    this._element.style.scale = value.toString()
    this.camera.zoom = value
  }

  #loadMap(map: Map) {
    this.layers = {
      background: new CanvasLayer(this._element, 0, map),
      foreground: new CanvasLayer(this._element, 2, map),
    }

    map.data.layers.forEach(layer => {
      console.log(layer.name)
      switch (layer.name) {
        case 'background':
          this.layers?.background.drawTileLayerGroup(layer)
          break;
        case 'foreground':
          this.layers?.foreground.drawTileLayerGroup(layer)
          break;
        case 'GameObjects':
          // agregar a un ObjectLayer y guardar coordenadas en tiles?
          break;
        default:
          console.warn(`Layer "${layer.name}" is not recognized`)
      }
    })
  }
}