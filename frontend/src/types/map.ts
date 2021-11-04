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
  MOON,
  STONE,
  WATER,
  LAVA,
}
