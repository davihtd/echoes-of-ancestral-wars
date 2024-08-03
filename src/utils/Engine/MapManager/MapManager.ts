import Element from '../../Element';
import CanvasLayer from './CanvasLayer';
import MapDataLoader from './MapDataLoader';


type CanvasLayers = {
  background: CanvasLayer
  foreground: CanvasLayer
}

export default class MapManager extends Element<'div'> {
  private layers: CanvasLayers | null = null
  readonly data: MapDataLoader;

  get zoom() {
    return Number(this.element.style.scale)
  }

  set zoom(value: number) {
    this.element.style.scale = value.toString()
  }

  constructor(mapContainerID: string, mapDataPath: string) {
    const $mapContainer = Element.get('#' + mapContainerID)
    super('div', $mapContainer)

    this.element.style.position = 'fixed'
    this.zoom = 2.5

    this.data = new MapDataLoader(mapDataPath, map => {

      this.layers = {
        background: new CanvasLayer(this.element, 0, map),
        foreground: new CanvasLayer(this.element, 2, map),
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
    })
  }
}

