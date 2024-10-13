import type { MapData, Tileset } from "../../../types/tiled/Map";
import type { Tileset as LoadedTileset } from "../../../types/tiled/Tileset";
import { loadImage } from '../utils';
import Map from "./Map";

class MapDataLoader {
  private static MAP_JSON_DATA_BASE_PATH = "/assets/";

  async getMap(mapName: string) {
    const mapPath = MapDataLoader.MAP_JSON_DATA_BASE_PATH + mapName + '.json'
    const mapData = await this.getMapData(mapPath);
    const tilesets: [Tileset, LoadedTileset][] = await Promise.all(
      mapData.tilesets.map(async (tileset) => {
        const tilesetData = await this.getTilesetData(
          MapDataLoader.MAP_JSON_DATA_BASE_PATH + tileset.source
        );
        return [tileset, tilesetData];
      })
    );

    return new Map(mapData, tilesets)
  }

  private async getMapData(mapDataPath: string) {
    try {
      const res = await fetch(mapDataPath);
      return (await res.json()) as MapData;
    } catch (error) {
      throw new Error("Failed to load map data");
    }
  }

  private async getTilesetData(
    tilesetDataPath: string
  ): Promise<LoadedTileset> {
    try {
      const res = await fetch(tilesetDataPath);
      const tilesetData = (await res.json()) as LoadedTileset;
      const image = MapDataLoader.MAP_JSON_DATA_BASE_PATH + tilesetData.image;
      await loadImage(image);
      return { ...tilesetData, image };
    } catch (error) {
      throw new Error("Failed to load map data");
    }
  }
}

export default new MapDataLoader()
