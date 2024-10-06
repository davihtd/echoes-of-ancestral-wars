import Element from "../../Element";
import Camera from "./Camera";
import ElementPosition from "../GameObject/ElementPosition";
import CanvasLayer from "./CanvasLayer";
import type Map from "./Map";
import MapDataLoader from "./MapDataLoader";
import GameObject from "../GameObject/GameObject";
import { Layers } from "../constants";
import MapCollisions from "./MapCollisions";

type CanvasLayers = {
  background: CanvasLayer;
  foreground: CanvasLayer;
};

export default class MapManager extends GameObject<"div"> {
  private layers: CanvasLayers;
  readonly collisions: MapCollisions;
  readonly camera: Camera;

  constructor(mapContainerID: string, map: Map) {
    const $mapContainer = Element.get("#" + mapContainerID);
    super("div", $mapContainer);

    this._element.style.position = "fixed";

    this.camera = new Camera(this.position);
    this.zoom = 2.5;

    this.layers = {
      background: new CanvasLayer(this._element, Layers.BACKGROUND, map),
      foreground: new CanvasLayer(this._element, Layers.FOREGROUND, map),
    };

    this.collisions = new MapCollisions(map, this._element);

    this.#prepareMap(map);
  }

  get zoom() {
    return Number(this._element.style.scale);
  }

  set zoom(value: number) {
    this._element.style.scale = value.toString();
    this.camera.zoom = value;
  }

  #prepareMap(map: Map) {
    map.data.layers.forEach((layer) => {
      console.info(layer.name);

      if (["background", "foreground"].includes(layer.name)) {
        this.layers?.background.drawTileLayerGroup(layer);
        this.collisions.registerLayerGroupCollisions(layer);
      } else if (layer.name == "GameObjects") {
        // agregar a un ObjectLayer y guardar coordenadas en tiles?
      } else {
        console.warn(`Layer "${layer.name}" is not recognized`);
      }
    });
  }
}
