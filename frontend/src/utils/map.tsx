import React from 'react';
import { getDirectionVector } from './direction';
import {
  Direction,
  Axis,
  TranslationVector,
  Land,
  Character,
  ModelFileFormat,
  ModelFile,
  BlockSet,
  BuildingBlock,
  MapBackground,
  MapEnvironmentObject,
} from '../types/map';
import { Arch, Columns, Disc, Model, NextDisc } from '../components/map';
import { Vector3 } from '@react-three/fiber';
import StairBox from 'components/map/composite/StairBox';
import { Stars } from '@react-three/drei';
import SkyDome from 'components/map/basic/SkyDome';
import { ChallengeColor } from 'types/challenges';
import { getHexCode } from './color';
import EnvironmentObject from 'components/map/composite/EnvironmentObject';

const LAND_DIRECTORY = 'land';
const CHARACTER_DIRECTORY = 'characters';
const BLOCK_DIRECTORY = 'blocks';
const ENVIRONMENT_DIRECTORY = 'environment';
const TEXTURE_DIRECTORY = 'textures';

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

export function getLandModelFile(land: Land): ModelFile {
  switch (land) {
    case Land.GRASS:
    case Land.SAND:
    case Land.STONE:
    case Land.BEEHIVE:
    case Land.CAKE:
    case Land.FOREST:
    case Land.POOL:
      return {
        path: `${LAND_DIRECTORY}/${Land[land].toLowerCase()}`,
        format: ModelFileFormat.GLB,
      };
    default:
      return {
        path: `${LAND_DIRECTORY}/${Land[land].toLowerCase()}.vox`,
        format: ModelFileFormat.OBJ,
      };
  }
}

export function getSecondaryLandModelFile(land: Land): ModelFile {
  switch (land) {
    case Land.GRASS:
    case Land.SAND:
    case Land.CAKE:
    case Land.FOREST:
    case Land.BEEHIVE:
      return {
        path: `${LAND_DIRECTORY}/${Land[land].toLowerCase()}2`,
        format: ModelFileFormat.GLB,
      };
    // Don't have yet
    default:
      return getLandModelFile(land);
  }
}

export function getCharacterModelFile(character: Character): ModelFile {
  switch (character) {
    case Character.GOLDEN_RETRIEVER:
    case Character.POMERANIAN:
    case Character.IKEACHEF:
      return {
        path: `${CHARACTER_DIRECTORY}/${Character[character].toLowerCase()}`,
        format: ModelFileFormat.GLB,
      };
    default:
      return {
        path: `${CHARACTER_DIRECTORY}/${Character[
          character
        ].toLowerCase()}.vox`,
        format: ModelFileFormat.OBJ,
      };
  }
}

export function getEnvironmentObject(
  environmentObject: MapEnvironmentObject
): JSX.Element {
  switch (environmentObject) {
    case MapEnvironmentObject.HOT_AIR_BALLOON:
    case MapEnvironmentObject.SPACESHIP:
      return (
        <EnvironmentObject
          position={[0, -5, 0]}
          modelFile={{
            path: `${ENVIRONMENT_DIRECTORY}/${MapEnvironmentObject[
              environmentObject
            ]
              .toLowerCase()
              .replace(' ', '_')}`,
            format: ModelFileFormat.GLB,
          }}
          scale={3}
        />
      );
    default:
      return <></>;
  }
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
const elevation = 20;

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
      return [d, elevation, d];
    case Direction.LEFT:
      return [-d, elevation, -d];
    case Direction.FORWARD:
      return [d, elevation, -d];
    case Direction.BACKWARD:
      return [-d, elevation, d];
    default:
      return [d, elevation, -d];
  }
}

export function getBuildingBlockSet(
  blockType: BuildingBlock,
  color: ChallengeColor
): BlockSet {
  const blockColor = getHexCode(color);
  switch (blockType) {
    case BuildingBlock.STAIRS:
      return {
        completed: (key: number, position: Vector3, direction: Direction) => (
          <StairBox
            key={key}
            position={position}
            direction={direction}
            colorOverride={'#569874'}
          />
        ),
        next: (key: number, position: Vector3, direction: Direction) => (
          <StairBox
            key={key}
            position={position}
            direction={direction}
            colorOverride={'#ffffff'}
          />
        ),
        future: (key: number, position: Vector3, direction: Direction) => (
          <StairBox
            key={key}
            direction={direction}
            position={position}
            colorOverride={blockColor}
          />
        ),
        widthIncrement: 2,
        heightIncrement: 1,
      };
    case BuildingBlock.CLOUD:
      const cloudModelFile = {
        path: `${BLOCK_DIRECTORY}/cloud_block.vox`,
        format: ModelFileFormat.OBJ,
      };
      const CloudBlock = (
        key: number,
        position: Vector3,
        direction: Direction
      ) => (
        <Model
          key={key}
          position={translate(position, { [Axis.Y]: -0.5 })}
          direction={direction}
          modelFile={cloudModelFile}
        />
      );
      return {
        completed: CloudBlock,
        next: CloudBlock,
        future: CloudBlock,
        widthIncrement: 1.5,
        heightIncrement: 1,
      };

    case BuildingBlock.DISC:
    default:
      return {
        completed: (key: number, position: Vector3) => (
          <Disc key={key} position={position} colorOverride={'#569874'} />
        ),
        next: (key: number, position: Vector3) => (
          <NextDisc key={key} position={position} colorOverride={'#ffffff'} />
        ),
        future: (key: number, position: Vector3) => (
          <Disc key={key} position={position} colorOverride={blockColor} />
        ),
        widthIncrement: 1.5,
        heightIncrement: 1,
      };
  }
}

export function getMapBackground(
  mapBackground: MapBackground,
  cameraZoom: number
): JSX.Element {
  switch (mapBackground) {
    case MapBackground.PURPLE_BLUE:
    case MapBackground.ORANGE:
    case MapBackground.GREEN_YELLOW:
      const texturePath = `/${TEXTURE_DIRECTORY}/${MapBackground[mapBackground]
        .toLowerCase()
        .replace('_', '')}`;
      return <SkyDome texturePath={texturePath} />;
    case MapBackground.STARS:
    default:
      return (
        <>
          <color attach="background" args={['#010101']} />
          <Stars
            factor={cameraZoom > 40 ? 1 : 10}
            radius={60 - cameraZoom}
            saturation={1}
            fade
          />
        </>
      );
  }
}
