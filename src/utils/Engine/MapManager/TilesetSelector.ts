import type { TileCoordinates, TileDimensions } from '../../../types/tiled/Helpers';
import type { Tileset } from '../../../types/tiled/Tileset';


export default class TilesetSelector {
  readonly data: Tileset;
  readonly tilesetGlobalID: number;
  readonly img: HTMLImageElement;

  constructor(tileset: Tileset, tilesetID: number) {
    this.data = tileset
    this.tilesetGlobalID = tilesetID
    this.img = new Image()
    this.img.src = this.data.image
  }

  get tileDimensions(): TileDimensions {
    return [this.data.tilewidth, this.data.tileheight]
  }

  getTileCoordinates(globalID: number): TileCoordinates {
    if (this.data.tilecount == 1) return [0, 0]
    const 
      localID = globalID - this.tilesetGlobalID,
      x = (localID % this.data.columns) * this.data.tilewidth,
      y = Math.floor(localID / this.data.columns) * this.data.tileheight

    return [x, y]
  }
}