import type { Coordinates, Tiles } from '../../../types/tiled/Helpers';
import type { MapData, Tileset } from '../../../types/tiled/Map';
import type { Tileset as LoadedTileset } from '../../../types/tiled/Tileset';
import TilesetSelector from './TilesetSelector';


type ModifiedMapData = Omit<MapData, 'tilesets'> & {
  readonly pxWidth: number
  readonly pxHeight: number
  readonly tilesets: TilesetSelector[]
}

export default class Map {
  data: ModifiedMapData;

  constructor(mapData: MapData, tilesets: [Tileset, LoadedTileset][]) {
    this.data = {
      ...mapData,
      pxWidth: mapData.width * mapData.tilewidth,
      pxHeight: mapData.height * mapData.tileheight,
      tilesets: tilesets.map(([ts, loadedTs]) => new TilesetSelector(loadedTs, ts.firstgid))
    };
  }

  getTilesetSelector(globalID: number) {
    let correctTileset: TilesetSelector = this.data.tilesets[0]

    for (const tileset of this.data.tilesets) {
      if (tileset.tilesetGlobalID > globalID) {
        return correctTileset
      };
      correctTileset = tileset;
    }

    return correctTileset
  }

  getTileCoordinates(layerWidth: Tiles, tileIndex: number): Coordinates {
    const
      tileX = tileIndex % layerWidth,
      tileY = Math.floor(tileIndex / layerWidth),
      x = tileX * this.data.tilewidth,
      y = tileY * this.data.tileheight;

    return [x, y]
  }
}
