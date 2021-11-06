import React from 'react';
import { getDirectionVector } from './direction';
import {
  Direction,
  Axis,
  TranslationVector,
  Land,
  Character,
} from '../types/map';
import { Arch, Columns } from '../components/map';
import { Vector3 } from '@react-three/fiber';

// Returns a Vector3 that is base + translationVector.
// The translation vector does not need to specify values for all three axes.
export function translate(
  base: Vector3,
  translationVector: TranslationVector
): Vector3 {
  const b = base as number[];
  const deltaX = translationVector[Axis.X] ?? 0;
  const deltaY = translationVector[Axis.Y] ?? 0;
  const deltaZ = translationVector[Axis.Z] ?? 0;
  return [b[0] + deltaX, b[1] + deltaY, b[2] + deltaZ];
}

export function regularTranslate(
  base: Vector3,
  direction: Direction,
  increment: number,
  times?: number
): Vector3 {
  const dv = getDirectionVector(direction) as number[];
  const t = times ?? 1;
  return translate(base, {
    [Axis.X]: dv[0] * increment * t,
    [Axis.Z]: dv[1] * increment * t,
  });
}

// Example usage:
// {buildRepeated({
//   buildBlock: (key: number, position: Vector3 ) => (
//     <Box key={key} position={position} />
//   ),
//   base: base,
//   height: 5,
//   width: 10
// })}
//
// Builds a wall of height 5 and width 10, facing default direction forward.
// The base coordinates sets the "bottom left" corner of the pattern.
// Pass in widthIncrement and heightIncrement when the repeating block is not 1x1.
// For example, to repeat an arch of 2x3 dimensions.
export function buildRepeated({
  buildBlock,
  base,
  height = 1,
  width = 1,
  repeatDirection = Direction.FORWARD,
  heightIncrement = 1,
  widthIncrement = 1,
}: {
  buildBlock: (key: number, position: Vector3) => JSX.Element;
  base: Vector3;
  height?: number;
  width?: number;
  repeatDirection?: Direction;
  heightIncrement?: number;
  widthIncrement?: number;
}): JSX.Element {
  const directionVector = getDirectionVector(repeatDirection) as number[];
  const deltaX = directionVector[0] * widthIncrement;
  const deltaZ = directionVector[1] * widthIncrement;
  return (
    <>
      {[...Array(width)].map((_, indexX) => (
        <group key={indexX}>
          {[...Array(height)].map((_, indexY) =>
            buildBlock(
              indexY,
              translate(base, {
                [Axis.X]: indexX * deltaX,
                [Axis.Y]: indexY * heightIncrement,
                [Axis.Z]: indexX * deltaZ,
              })
            )
          )}
        </group>
      ))}
    </>
  );
}

// Example usage:
// buildArch({
//   base: base,
//   direction: Direction.BACKWARD,
//   width: 2,
//   height: 3,
// }),
//
// Builds an arch of width 2 and height 3.
// The base coordinates sets the "bottom left" corner of the arch.
export function buildArch({
  base,
  height = 1,
  width = 1,
  columnWidthOverride,
  direction = Direction.FORWARD,
  key,
}: {
  base: Vector3;
  height?: number;
  width?: number;
  columnWidthOverride?: number;
  direction?: Direction;
  key?: number;
}): JSX.Element {
  const directionVector = getDirectionVector(direction) as number[];
  const xIncrement = directionVector[0];
  const zIncrement = directionVector[1];

  const columnWidth = columnWidthOverride ?? 0.15 * width;
  return (
    <group key={key}>
      <Arch
        position={translate(base, {
          [Axis.X]: (width / 2) * xIncrement,
          [Axis.Y]: height - width + (width / 2 - 0.5),
          [Axis.Z]: (width / 2) * zIncrement,
        })}
        direction={direction}
        width={width}
        height={width}
        columnWidth={columnWidth}
      />
      <Columns
        position={translate(base, {
          [Axis.X]: (width / 2 - 0.5) * xIncrement,
          [Axis.Y]: 0,
          [Axis.Z]: (width / 2 - 0.5) * zIncrement,
        })}
        columnWidth={columnWidth}
        direction={direction}
        width={width}
        height={height - width}
      />
    </group>
  );
}

export function buildDiagonalRepeated({
  buildBlock,
  base,
  width = 1,
  repeatDirection = Direction.FORWARD,
  heightIncrement = 0,
  widthIncrement = 1,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  buildCallback = (_) => {
    return;
  },
}: {
  buildBlock: (key: number, position: Vector3) => JSX.Element;
  base: Vector3;
  height?: number;
  width?: number;
  repeatDirection?: Direction;
  heightIncrement?: number;
  widthIncrement?: number;
  buildCallback?: (position: Vector3) => void;
}): JSX.Element {
  const directionVector = getDirectionVector(repeatDirection) as number[];
  const deltaX = directionVector[0] * widthIncrement;
  const deltaZ = directionVector[1] * widthIncrement;
  return (
    <>
      {[...Array(width)].map((_, index) => {
        const blockPosition = translate(base, {
          [Axis.X]: index * deltaX,
          [Axis.Y]: index * heightIncrement,
          [Axis.Z]: index * deltaZ,
        });
        buildCallback(blockPosition);
        return buildBlock(index, blockPosition);
      })}
    </>
  );
}

export function getLandPath(land: Land): string {
  switch (land) {
    case Land.GRASS:
      return 'land/grass.vox';
    default:
      return 'land/grass.vox';
  }
}

export function getCharacterPath(character: Character | string): string {
  if (typeof character === 'string') {
    return `characters/${character.toLowerCase()}.vox`;
  }
  return `characters/${Character[character].toLowerCase()}.vox`;
}

const cameraZoomBreakpointsMobile = [
  // numSteps, zoomFactor
  [20, 15],
  [6, 18],
  [5, 25],
  [4, 30],
  [3, 40],
  [0, 45],
];

const cameraZoomBreakpointsDesktop = [
  // numSteps, zoomFactor
  [20, 20],
  [10, 25],
  [6, 30],
  [5, 35],
  [4, 40],
  [3, 45],
  [0, 50],
];

// camera distance
const d = 60;

export function getCameraZoomForMobile(numSteps: number): number {
  const myBp = cameraZoomBreakpointsMobile.find((a) => {
    return a[0] < numSteps;
  });
  return myBp ? myBp[1] : 45;
}

export function getCameraZoomForDesktop(numSteps: number): number {
  const myBp = cameraZoomBreakpointsDesktop.find((a) => {
    return a[0] < numSteps;
  });
  return myBp ? myBp[1] : 50;
}

export function getCameraPosition(characterDirection: Direction): Vector3 {
  switch (characterDirection) {
    case Direction.RIGHT:
      return [d, d, -d];
    case Direction.LEFT:
      return [-d, d, d];
    case Direction.FORWARD:
      return [-d, d, -d];
    case Direction.BACKWARD:
      return [d, d, d];
    default:
      return [d, d, -d];
  }
}
