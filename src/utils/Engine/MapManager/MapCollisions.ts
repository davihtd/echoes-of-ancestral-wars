import { Axis } from "../../../types/helpers";
import type { Tiles } from "../../../types/tiled/helpers";
import type { MapDataLayer, ObjectElement } from "../../../types/tiled/Map";
import { Config } from "../constants";
import GameObject from "../GameObject/GameObject";
import type { CoordinatesTuple } from "../Utils/Point";
import MapCollision from "./MapCollision";
import type Map from "./Map";
import type Point from "../Utils/Point";
import type CollisionBox from "../Utils/CollisionBox";

export default class MapCollisions {
  static SHOW_COLLISIONS = Config.SHOW_COLLISIONS;
  static SHOW_COLLISION_ZONES = Config.SHOW_COLLISION_ZONES;

  readonly zoneSize: number;
  readonly collisionZones: Record<string, MapCollision[] | null> = {};

  constructor(private map: Map, private mapElement: HTMLElement) {
    this.zoneSize = map.data.tilewidth * 5;
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
      const collision = new MapCollision(tileCoordinates, rawCollision);
      this.registerCollision(collision);
    });
  }

  private registerCollision(collision: MapCollision) {
    const zoneID = this.getZoneID(collision.topLeftCorner);

    if (MapCollisions.SHOW_COLLISION_ZONES && !this.collisionZones[zoneID]) {
      const coordinates = JSON.parse(zoneID) as CoordinatesTuple;
      const zone = new GameObject("div", this.mapElement, {
        x: coordinates[0] * this.zoneSize,
        y: coordinates[1] * this.zoneSize,
        width: this.zoneSize,
        height: this.zoneSize,
      });

      zone.setDebugMode(true, `Collision zone ${zoneID}`);
    }

    if (MapCollisions.SHOW_COLLISIONS) {
      const collisionGO = new GameObject("div", this.mapElement, {
        x: collision.topLeftCorner.x,
        y: collision.topLeftCorner.y,
        width: collision.bottomRightCorner.x - collision.topLeftCorner.x,
        height: collision.bottomRightCorner.y - collision.topLeftCorner.y,
      });

      collisionGO.setDebugMode(true, "");
    }

    this.collisionZones[zoneID] = this.collisionZones[zoneID] || [];
    this.collisionZones[zoneID].push(collision);
  }

  private getZoneID(position: Point): string {
    const getAxis = (axis: Axis) => {
      return Math.floor(position[axis] / this.zoneSize);
    };

    const collisionCoordinates: CoordinatesTuple = [
      getAxis(Axis.X),
      getAxis(Axis.Y),
    ];

    return JSON.stringify(collisionCoordinates);
  }

  private getNearZonesIDs(collision: CollisionBox): string[] {
    const zones: Record<string, boolean> = {};

    const addZoneID = (corners: Point[]) => {
      corners.forEach((corner) => {
        const zoneID = this.getZoneID(corner);
        zones[zoneID] = true;
      });
    };

    addZoneID([
      collision.topRightCorner,
      collision.topLeftCorner,
      collision.bottomRightCorner,
      collision.bottomLeftCorner,
    ]);

    return Object.keys(zones);
  }

  getNearCollisions(collision: CollisionBox): MapCollision[] {
    const nearZones = this.getNearZonesIDs(collision);
    return nearZones.flatMap((zoneID) => {
      const collision = this.collisionZones[zoneID];
      if (!collision) return [];
      return collision;
    });
  }
}
