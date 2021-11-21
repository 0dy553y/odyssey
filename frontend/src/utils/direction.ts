import { Direction } from '../types/map';
import { Vector2 } from '@react-three/fiber';

// Returns an angle, in radians, of how much to rotate an object
// such that it faces the input direction.
export const getRotation = (direction: Direction): number => {
  const r = Math.PI / 2;

  switch (direction) {
    case Direction.FORWARD:
      return -r;
    case Direction.BACKWARD:
      return r;
    case Direction.LEFT:
      return 0;
    case Direction.RIGHT:
      return -2 * r;
  }
};

export const getDirectionVector = (d: Direction): Vector2 => {
  switch (d) {
    case Direction.FORWARD:
      return [-1, 0];
    case Direction.BACKWARD:
      return [1, 0];
    case Direction.LEFT:
      return [0, 1];
    case Direction.RIGHT:
      return [0, -1];
  }
};

// Clockwise.
export function nextDirectionCW(currentDirection: Direction): Direction {
  return currentDirection === 0 ? 3 : currentDirection - 1;
}

// Anti-clockwise.
export function nextDirectionACW(currentDirection: Direction): Direction {
  return (currentDirection + 1) % 4;
}
