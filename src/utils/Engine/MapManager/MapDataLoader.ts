import type { MapData, Tileset } from '../../../types/tiled/Map';
import type { Tileset as LoadedTileset } from '../../../types/tiled/Tileset';
import Map from './Map';

export default class MapDataLoader {
  private static MAP_JSON_DATA_BASE_PATH = '/assets/'

  /**
   * Crea el mapa con la información proporcionada
   * @param bgCanvas el canvas para el fondo
   * @param fgCanvas el canvas para el foreground
   * @param mapDataPath la ruta hacia el archivo que contiene la información del mapa
   */
  constructor(mapDataPath: string, onLoadEnd: (data: Map) => void) {
    this.loadData(mapDataPath, onLoadEnd)
  }

  private async loadData(mapDataPath: string, onLoadEnd: (data: Map) => void) {
    const mapData = await this.getMapData(mapDataPath)
    const tilesets: [Tileset, LoadedTileset][] = await Promise.all(mapData.tilesets.map(async tileset => {
      const tilesetData = await this.getTilesetData(MapDataLoader.MAP_JSON_DATA_BASE_PATH + tileset.source)
      return [tileset, tilesetData]
    }))

    onLoadEnd(new Map(mapData, tilesets))
  }

  private async getMapData(mapDataPath: string) {
    try {
      const res = await fetch(mapDataPath)
      return await res.json() as MapData
    } catch (error) {
      throw new Error('Failed to load map data')
    }
  }

  private async getTilesetData(tilesetDataPath: string): Promise<LoadedTileset> {
    try {
      const res = await fetch(tilesetDataPath)
      const tilesetData = await res.json() as LoadedTileset
      const image = MapDataLoader.MAP_JSON_DATA_BASE_PATH + tilesetData.image
      await loadImage(image)
      return { ...tilesetData, image }
    } catch (error) {
      throw new Error('Failed to load map data')
    }
  }
}

async function loadImage(imgPath: string): Promise<void> {
  return new Promise(resolve => {
    const image = new Image()
    image.src = imgPath
    image.addEventListener('load', () => resolve())
  })
}