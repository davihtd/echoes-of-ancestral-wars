import type { SecureOmit } from "../../../types/helpers";
import { Config } from "../constants";
import type MapCollisions from "../MapManager/MapCollisions";
import type Dimensions from '../Utils/Dimensions';
import Point from '../Utils/Point';
import type { SpriteSheetAnimationParameters } from "../Utils/SpriteSheetAnimation";
import SpriteSheetAnimation from "../Utils/SpriteSheetAnimation";
import Character, { type CharacterElementRequiredParams, type CharacterStats } from "./Character";
import CharacterCollision from "./CharacterCollision";
import Move from "./Move";

export type PlayableCharacterStats = CharacterStats & {
  walkingSpeed: number;
  runningSpeed: number;
};

export type CharacterAnimations =
  | "idle_bottom"
  | "idle_top"
  | "idle_side"
  | "move_bottom"
  | "move_top"
  | "move_side"
  | "attack_bottom"
  | "attack_top"
  | "attack_side"
  | "die";

type PlayableCharacterParameters = {
  layer: HTMLElement;
  element: CharacterElementRequiredParams;
  collision: {
    positionInElement: Point
    dimensions: Dimensions
  }
  stats: PlayableCharacterStats;
  mapCollisions: MapCollisions;
  animation: SecureOmit<SpriteSheetAnimationParameters<CharacterAnimations>, "element">;
};

export default class PlayableCharacter extends Character {
  walkingSpeed: number;
  runningSpeed: number;
  readonly move: Move;
  readonly animation: SpriteSheetAnimation<CharacterAnimations>;

  constructor(parameters: PlayableCharacterParameters) {
    super(parameters.layer, parameters.element, parameters.stats);

    this._element.id = "character";

    this.walkingSpeed = parameters.stats.walkingSpeed;
    this.runningSpeed = parameters.stats.runningSpeed;

    this.animation = new SpriteSheetAnimation({
      ...parameters.animation,
      element: this._element,
    });

    this.move = new Move(
      this.elementPosition,
      this.walkingSpeed,
      new CharacterCollision(
        {
          characterPosition: this.elementPosition,
          collisionPosition: parameters.collision.positionInElement,
          dimensions: parameters.collision.dimensions,
          mapCollisions: parameters.mapCollisions,
          characterElement: this._element,
        }
      )
    );

    this.setDebugMode(Config.SHOW_PLAYER_COLLISION, null);
  }

  startRunning() {
    this.move.speed = this.runningSpeed;
    this.animation.currentInterval = 50
  }

  stopRunning() {
    this.move.speed = this.walkingSpeed;
    this.animation.currentInterval = 70
  }
}
