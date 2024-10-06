import { Axis } from "../../../types/helpers";
import type { Tiles } from "../../../types/tiled/helpers";
import type { MapDataLayer, ObjectElement } from "../../../types/tiled/Map";
import GameObject from "../GameObject/GameObject";
import type { CoordinatesTuple } from "../Utils/Point";
import CollisionBox from "./Collision";
import type Map from "./Map";

export default class MapCollisions {
  map: Map;
  zoneSize: number;
  collisionZones: Record<string, CollisionBox[] | null> = {};

  mapElement: HTMLElement;
  static SHOW_COLLISIONS = true;
  static SHOW_COLLISION_ZONES = true;

  constructor(map: Map, mapElement: HTMLElement) {
    this.map = map;
    this.zoneSize = map.data.tilewidth * 5;

    this.mapElement = mapElement;
  }

  registerLayerGroupCollisions(layerGroup: MapDataLayer) {
    if (!layerGroup.layers) throw new Error("There are not subLayers");

    layerGroup.layers?.forEach((layer) => {
      this.registerLayerCollisions(layer);
    });
  }

  private registerLayerCollisions(layer: ObjectElement) {
    if (!layer.data) console.warn("No layer data found");

    layer.data?.forEach((globalID, tileIndex) => {
      if (!globalID) return;
      this.registerRawCollisions(globalID, layer.width, tileIndex);
    });
  }

  private registerRawCollisions(
    globalID: number,
    layerWidth: Tiles,
    tileIndex: number
  ) {
    const tileset = this.map.getTilesetSelector(globalID);
    const rawCollisions = tileset.getTileRawCollisions(globalID);
    const tileCoordinates = this.map.getTileCoordinates(layerWidth, tileIndex);

    rawCollisions?.map((rawCollision) => {
      const collision = new CollisionBox(tileCoordinates, rawCollision);
      this.registerCollision(collision);
    });
  }

  private registerCollision(collision: CollisionBox) {
    const zoneID = this.getZoneIdentifier(collision);

    if (MapCollisions.SHOW_COLLISION_ZONES && !this.collisionZones[zoneID]) {
      const coordinates = JSON.parse(zoneID) as CoordinatesTuple;
      const zone = new GameObject("div", this.mapElement, {
        x: coordinates[0] * this.zoneSize,
        y: coordinates[1] * this.zoneSize,
        width: this.zoneSize,
        height: this.zoneSize,
      });

      zone.setDebugMode(true, `Collision zone ${zoneID}`)
    }

    if (MapCollisions.SHOW_COLLISIONS) {
      const collisionGO = new GameObject("div", this.mapElement, {
        x: collision.topLeftCorner.x,
        y: collision.topLeftCorner.y,
        width: collision.bottomRightCorner.x - collision.topLeftCorner.x,
        height: collision.bottomRightCorner.y - collision.topLeftCorner.y,
      });

      collisionGO.setDebugMode(true, '')
    }

    this.collisionZones[zoneID] = this.collisionZones[zoneID] || [];
    this.collisionZones[zoneID].push(collision);
  }

  getZoneIdentifier(collision: CollisionBox): string {
    const getAxis = (axis: Axis) => {
      return Math.floor(collision.topRightCorner[axis] / this.zoneSize);
    };

    const collisionCoordinates: CoordinatesTuple = [
      getAxis(Axis.X),
      getAxis(Axis.Y),
    ];

    return JSON.stringify(collisionCoordinates);
  }
}
