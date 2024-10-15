import Point from "./Point";
import SpriteSelector from "./SpriteSelector";

type AnimationSequences<SK extends string> = Record<SK, Point[]>;

export type SpriteSheetAnimationParameters<SK extends string> = {
  spriteSelector: SpriteSelector;
  animationSequences: AnimationSequences<SK>;
  defaultSequence: SK;
  defaultInterval: number;
  element: HTMLElement;
};

export default class SpriteSheetAnimation<SK extends string> {
  private spriteSelector: SpriteSelector;
  private animationSequences: AnimationSequences<SK>;
  private element: HTMLElement;

  private mirror = false;
  private currentFrame = 0;
  public currentInterval: number;
  private currentSequence: SK;
  private intervalID: number = 0;

  constructor(parameters: SpriteSheetAnimationParameters<SK>) {
    this.spriteSelector = parameters.spriteSelector;
    this.animationSequences = parameters.animationSequences;
    this.element = parameters.element;

    const style = this.element.style;
    style.backgroundImage = `url(${this.spriteSelector.spriteSheet.src})`;
    style.backgroundSize = `${this.spriteSelector.spriteSheet.width}px ${this.spriteSelector.spriteSheet.height}px`;
    style.imageRendering = "pixelated";

    this.currentInterval = parameters.defaultInterval;

    // siempre se ejecuta primero setAnimation
    this.setAnimation(parameters.defaultSequence);
    this.currentSequence = parameters.defaultSequence;
  }

  setAnimation(sequence: SK, mirror: boolean = false) {
    if (this.currentSequence == sequence && mirror == this.mirror) return;
    clearInterval(this.intervalID);

    this.mirror = mirror;
    this.currentSequence = sequence;
    this.currentFrame = 0;

    this.element.style.scale = mirror ? '-1 1' : '1 1'

    this.loop();
  }

  private loop() {
    this.intervalID = setTimeout(() => {
      const sequence = this.animationSequences[this.currentSequence];

      const spriteCoordinates = sequence[this.currentFrame];

      const style = this.element.style;

      /* if (this.mirror) {
        spriteCoordinates.x = sequence.length - spriteCoordinates.x;
      } */

      const spritePixelCoordinates = this.spriteSelector.getSprite(
        spriteCoordinates.y,
        spriteCoordinates.x
      );

      style.backgroundPositionX = `-${spritePixelCoordinates.x}px`;
      style.backgroundPositionY = `-${spritePixelCoordinates.y}px`;

      this.currentFrame++;
      if (this.currentFrame >= sequence.length) {
        this.currentFrame = 0;
      }

      this.loop();
    }, this.currentInterval);
  }
}
