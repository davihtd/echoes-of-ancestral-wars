import { Config } from "../constants";
import type MapCollisions from "../MapManager/MapCollisions";
import type Point from "../Utils/Point";
import Character, { type CharacterStats } from "./Character";
import CharacterCollision from "./CharacterCollision";
import Move from "./Move";

export type PlayableCharacterStats = CharacterStats & {
  walkingSpeed: number;
  runningSpeed: number;
};

export default class PlayableCharacter extends Character {
  walkingSpeed: number;
  runningSpeed: number;
  readonly move: Move;

  constructor(
    layer: HTMLElement,
    position: Point,
    stats: PlayableCharacterStats,
    mapCollisions: MapCollisions
  ) {
    super(layer, position, stats);

    this.walkingSpeed = stats.walkingSpeed;
    this.runningSpeed = stats.runningSpeed;

    this.move = new Move(
      this.position,
      this.walkingSpeed,
      new CharacterCollision(position, this.dimensions, mapCollisions)
    );

    this.setDebugMode(Config.SHOW_PLAYER_COLLISION, "Player");
  }

  startRunning() {
    this.move.speed = this.runningSpeed;
  }

  stopRunning() {
    this.move.speed = this.walkingSpeed;
  }
}
