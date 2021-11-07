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

// anyhow put for now.
export enum Land {
  GRASS,
  SAND,
  STONE,
  BEEHIVE,
}

export enum Character {
  ASTRONAUT,
  BLUE_ASTRONAUT,
  YELLOW_ASTRONAUT,
  FISHBOWL_ASTRONAUT,
  PUMPKIN_ASTRONAUT,
}

export enum ModelFileFormat {
  OBJ,
  GLB,
}

export type FilePath = string;

export interface ModelFile {
  path: FilePath;
  format: ModelFileFormat;
}
