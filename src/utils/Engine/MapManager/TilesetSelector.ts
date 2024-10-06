import type { Object, Tileset } from "../../../types/tiled/Tileset";
import CollisionBox from "./Collision";
import Point from "../Utils/Point";
import Dimensions from "../Utils/Dimensions";

export default class TilesetSelector {
  readonly data: Tileset;
  readonly tilesetGlobalID: number;
  readonly img: HTMLImageElement;

  constructor(tileset: Tileset, tilesetID: number) {
    this.data = tileset;
    this.tilesetGlobalID = tilesetID;
    this.img = new Image();
    this.img.src = this.data.image;
  }

  /**El tamaño de cada tile en el tileset */
  get tileDimensions(): Dimensions {
    return new Dimensions([this.data.tilewidth, this.data.tileheight]);
  }

  private getLocalID(globalID: number): number {
    return globalID - this.tilesetGlobalID;
  }

  /**@returns las coordenadas X e Y en pixeles en el contexto del tileset */
  private getTileCoordinatesFromLocalID(localID: number) {
    const x = (localID % this.data.columns) * this.data.tilewidth;
    const y = Math.floor(localID / this.data.columns) * this.data.tileheight;

    return new Point([x, y]);
  }

  /**@returns las coordenadas X e Y en pixeles en el contexto del tileset */
  getTileCoordinates(globalID: number): Point {
    if (this.data.tilecount == 1) return new Point([0, 0]);
    const localID = this.getLocalID(globalID);

    return this.getTileCoordinatesFromLocalID(localID);
  }

  /**@returns las colisiones en crudo */
  getTileRawCollisions(globalID: number): Object[] | null {
    const tiles = this.data.tiles;
    if (!tiles) return null;

    const localID = this.getLocalID(globalID);
    const tile = tiles.find((tile) => tile.id == localID);
    if (!tile) return []

    return tile.objectgroup.objects;
  }
}
