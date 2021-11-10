import { Vector3 } from '@react-three/fiber';

export enum Direction {
  // Facing negative x axis.
  FORWARD,
  // Facing positive z axis.
  LEFT,
  // Facing positive x axis.
  BACKWARD,
  // Facing negative z axis.
  RIGHT,
}

export enum Axis {
  X,
  Y,
  Z,
}

export type TranslationVector = Partial<Record<Axis, number>>;

export interface DirectionPosition {
  pos: Vector3;
  direction: Direction;
}

export enum Land {
  GRASS,
  SAND,
  STONE,
  BEEHIVE,
  CAKE,
  FOREST,
  POOL,
}

export enum Character {
  ASTRONAUT,
  BLUE_ASTRONAUT,
  YELLOW_ASTRONAUT,
  FISHBOWL_ASTRONAUT,
  PUMPKIN_ASTRONAUT,
  GOLDEN_RETRIEVER,
  POMERANIAN,
  IKEACHEF,
}

export enum ModelFileFormat {
  OBJ,
  GLB,
}

type FilePath = string;
export interface ModelFile {
  path: FilePath;
  format: ModelFileFormat;
}

export enum BuildingBlock {
  DISC,
  STAIRS,
  CLOUD,
}

type MapComponent = (
  key: number,
  position: Vector3,
  direction: Direction
) => JSX.Element;

export interface BlockSet {
  completed: MapComponent;
  next: MapComponent;
  future: MapComponent;
  widthIncrement: number;
  heightIncrement: number;
}

export enum MapBackground {
  STARS,
  PURPLE_BLUE,
  ORANGE,
  GREEN_YELLOW,
}

export enum MapEnvironmentObject {
  HOT_AIR_BALLOON_RED,
  SPACESHIP,
  HOT_AIR_BALLOON_BLUE,
}
