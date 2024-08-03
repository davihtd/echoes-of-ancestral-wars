export type MapData = {
  readonly compressionlevel: number;
  readonly editorsettings:   Editorsettings;
  readonly height:           number;
  readonly infinite:         boolean;
  readonly layers:           MapDataLayer[];
  readonly nextlayerid:      number;
  readonly nextobjectid:     number;
  readonly orientation:      string;
  readonly renderorder:      string;
  readonly tiledversion:     string;
  readonly tileheight:       number;
  readonly tilesets:         Tileset[];
  readonly tilewidth:        number;
  readonly type:             string;
  readonly version:          string;
  readonly width:            number;
}

export type Editorsettings = {
  readonly export: Export;
}

export type Export = {
  readonly format: string;
}

export type MapDataLayer = {
  readonly id:         number;
  readonly layers?:    ObjectElement[];
  readonly name:       string;
  readonly opacity:    number;
  readonly type:       string;
  readonly visible:    boolean;
  readonly x:          number;
  readonly y:          number;
  readonly draworder?: string;
  readonly objects?:   ObjectElement[];
}

export type ObjectElement = {
  readonly data?:       number[];
  readonly height:      number;
  readonly id:          number;
  readonly name:        string;
  readonly opacity?:    number;
  readonly type:        string;
  readonly visible:     boolean;
  readonly width:       number;
  readonly x:           number;
  readonly y:           number;
  readonly rotation?:   number;
  readonly properties?: Property[];
}

export type Property = {
  readonly name:  string;
  readonly type:  string;
  readonly value: string;
}

export type Tileset = {
  readonly firstgid: number;
  readonly source:   string;
}
