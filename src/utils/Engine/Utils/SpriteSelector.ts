import { loadImage } from "../utils";
import Point from "./Point";

export default class SpriteSelector {
  readonly spriteSheet: HTMLImageElement;
  /** Se accede a la coordenada seleccionando la fila y luego la columna */
  private spriteCoordinates: Record<number, Record<number, Point>>;

  constructor(
    readonly spriteSheetPath: string,
    readonly rows: number,
    readonly columns: number,
    readonly spriteSize: number,
    readonly paddingBetween: number = 0
  ) {
    this.spriteSheet = new Image();
    this.spriteSheet.src = spriteSheetPath;
    this.spriteCoordinates = {};
  }

  /**Carga la imagen del spritesheet, y cachea las coordenadas de cada sprite */
  async loadSpriteSheet() {
    await loadImage(this.spriteSheetPath);
    for (let row = 0; row < this.rows; row++) {
      this.spriteCoordinates[row] = {};
      for (let column = 0; column < this.columns; column++) {
        const spriteCoordinates = this.getSpriteCoordinates(row, column);
        this.spriteCoordinates[row][column] = spriteCoordinates;
      }
    }
  }

  private getSpriteCoordinates(row: number, column: number): Point {
    const multiplier = this.spriteSize + this.paddingBetween;
    const extraPadding = this.paddingBetween / 2;
    return new Point({
      x: column * multiplier + extraPadding,
      y: row * multiplier + extraPadding,
    });
  }

  /**Retorna las coordenadas cacheadas de un sprite */
  getSprite(row: number, column: number): Point {
    return this.spriteCoordinates[row][column];
  }

  getSpriteAsDiv(row: number, column: number): HTMLDivElement {
    const spriteCoordinates = this.getSprite(row, column);
    const div = document.createElement("div");
    div.style.width = `${this.spriteSize}px`;
    div.style.height = `${this.spriteSize}px`;
    div.style.backgroundImage = `url(${this.spriteSheetPath})`;
    div.style.backgroundPosition = `-${spriteCoordinates.x}px -${spriteCoordinates.y}px`;
    return div;
  }
}
