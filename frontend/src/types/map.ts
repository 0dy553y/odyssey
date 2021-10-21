export enum Direction {
  // Facing negative x axis.
  FORWARD,
  // Facing positive x axis.
  BACKWARD,
  // Facing positive z axis.
  LEFT,
  // Facing negative z axis.
  RIGHT,
}

export enum Axis {
  X,
  Y,
  Z,
}

export type TranslationVector = Partial<Record<Axis, number>>;
