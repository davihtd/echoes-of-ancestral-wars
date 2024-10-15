import type { Axis } from "../../../types/helpers";
import Element from "../../Element";
import { Config, Layers } from "../constants";
import type ElementDimensions from "../GameObject/ElementDimensions";
import type ElementPosition from "../GameObject/ElementPosition";
import type MapCollisions from "../MapManager/MapCollisions";
import CollisionBox from "../Utils/CollisionBox";
import type Dimensions from "../Utils/Dimensions";
import Point from "../Utils/Point";

type CharacterCollisionParams = {
  characterPosition: ElementPosition;
  collisionPosition: Point;
  dimensions: Dimensions;
  mapCollisions: MapCollisions;
  characterElement: HTMLElement;
};

export default class CharacterCollision extends CollisionBox {
  private mapCollisions: MapCollisions;

  constructor(parameters: CharacterCollisionParams) {
    const { dimensions, collisionPosition } = parameters;
    const inMapCollisionPosition = parameters.collisionPosition.add(
      parameters.characterPosition
    );

    super(inMapCollisionPosition, parameters.dimensions);

    this.mapCollisions = parameters.mapCollisions;

    if (Config.SHOW_PLAYER_COLLISION) {
      const collisionElement = new Element("div", parameters.characterElement);
      collisionElement._element.style.position = "absolute";
      collisionElement.elementDimensions.width = dimensions.width;
      collisionElement.elementDimensions.height = dimensions.height;
      collisionElement.elementPosition.x = collisionPosition.x;
      collisionElement.elementPosition.y = collisionPosition.y;

      collisionElement.setDebugMode(true, "Collision");
    }
  }

  isCollisionMovingTo(axis: Axis, toMove: number): boolean {
    this.addToAxis(axis, toMove);

    const collisions = this.mapCollisions.getNearCollisions(this);

    const collisionWasDetected = collisions.some((mapCollision) => {
      return this.isCollidingCollision(mapCollision);
    });

    if (collisionWasDetected) {
      this.addToAxis(axis, -toMove);
    }
    
    return collisionWasDetected;
  }

  addToAxis(axis: Axis, value: number) {
    this.topLeftCorner[axis] += value;
    this.bottomRightCorner[axis] += value;
  }
}
