import Element from "../../Element";
import ElementPosition from "../GameObject/ElementPosition";
import Dimensions from "../Utils/Dimensions";
import { Layers } from "../constants";
import Camera from "./Camera";
import CanvasLayer from "./CanvasLayer";
import type Map from "./Map";
import MapCollisions from "./MapCollisions";

type CanvasLayers = {
  background: CanvasLayer;
  foreground: CanvasLayer;
};

export default class MapManager extends Element<"div"> {
  private layers: CanvasLayers;
  readonly collisions: MapCollisions;
  readonly camera: Camera;
  readonly dimensions: Dimensions;
  private position: ElementPosition;

  constructor(mapContainerID: string, map: Map) {
    const $mapContainer = Element.get("#" + mapContainerID);
    super("div", $mapContainer);

    this._element.style.position = "fixed";

    this.layers = {
      background: new CanvasLayer(this._element, Layers.BACKGROUND, map),
      foreground: new CanvasLayer(this._element, Layers.FOREGROUND, map),
    };

    this.collisions = new MapCollisions(map, this._element);

    this.dimensions = new Dimensions({
      width: map.data.pxWidth,
      height: map.data.pxHeight,
    });

    this.position = new ElementPosition(this._element);

    this.camera = new Camera(this.position);
    this.zoom = 3;

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
