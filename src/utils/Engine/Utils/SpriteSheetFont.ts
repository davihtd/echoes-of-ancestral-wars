import type Point from "./Point";
import type SpriteSelector from "./SpriteSelector";

/**@deprecated no funciona bien, pero ya es un comienzo para el futuro */
export default class SpriteSheetFont {
  static readonly numbers = "1234567890";
  private characterCoordinates: Record<string, Point>;

  /**
   * @param chars caracteres en orden
   */
  constructor(private spriteSelector: SpriteSelector, chars: string) {
    this.characterCoordinates = {};
    chars.split("").forEach((char, index) => {
      this.characterCoordinates[char] = this.getCharacterCoordinates(index);
    });
  }

  /** a partir del index y de las filas y columnas,
   * retorna las coordenadas de cada caracter */
  private getCharacterCoordinates(index: number): Point {
    const row = Math.floor(index / this.spriteSelector.columns);
    const column = index % this.spriteSelector.columns;

    return this.spriteSelector.getSprite(row, column);
  }

  getWordAsCanvas(text: string): HTMLCanvasElement {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) throw new Error("Can't create 2D context");

    ctx.font = "16px Arial";
    ctx.textBaseline = "top";

    text.split("").forEach((char) => {
      const characterCoordinates = this.characterCoordinates[char];
      ctx.drawImage(
        this.spriteSelector.spriteSheet,
        ...characterCoordinates.coordinates,
        this.spriteSelector.spriteSize,
        this.spriteSelector.spriteSize
      );
    });

    return canvas;
  }

  getTextAsFlexBox(text: string): HTMLDivElement {
    const container = document.createElement("div");
    container.style.display = "flex-inline";

    text.split(" ").forEach((word) => {
      const canvas = this.getWordAsCanvas(word);
      container.appendChild(canvas);
    });

    return container;
  }
}
