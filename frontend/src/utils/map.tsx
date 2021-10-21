import React from 'react';
import { getDirectionVector } from './direction';
import { Direction, Axis, TranslationVector } from '../types/map';
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
}) {
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
}) {
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
