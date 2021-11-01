import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Vector3 } from '@react-three/fiber';
import { Island, Disc, NextDisc } from '..';

import { Direction, Axis } from '../../../types/map';
import {
  translate,
  buildDiagonalRepeated,
  regularTranslate,
} from '../../../utils/map';
import { DirectionPosition } from '../../../types/map';
import { getDirectionVector, nextDirectionACW } from '../../../utils/direction';
import Prize from '../composite/Prize';
interface MapProps {
  numSteps: number;
  currentStep: number;
  width: number;
  widthIncrement: number;
  heightIncrement: number;
  prizePath: string;
  onMapMounted: (pos: DirectionPosition[]) => void;
}

const SpaceMapStructure = (props: MapProps, ref: React.Ref<unknown>) => {
  const {
    numSteps,
    currentStep,
    width,
    widthIncrement,
    heightIncrement,
    prizePath,
    onMapMounted,
  } = props;
  const numStages = Math.floor(numSteps / width);
  let base: Vector3 = [
    width * widthIncrement,
    10 - numSteps / 2,
    width * widthIncrement,
  ];
  let currentDirection = Direction.RIGHT;

  const [step, setStep] = useState(currentStep);
  const stepPositions: DirectionPosition[] = [];

  useEffect(() => {
    onMapMounted(stepPositions);
  }, []);

  useImperativeHandle(ref, () => ({
    setCurrentStep: (step: number) => {
      setStep(step);
    },
  }));

  const buidDisc = (
    key: number,
    position: Vector3,
    index: number
  ): JSX.Element => {
    if (index === step + 1) {
      return (
        <NextDisc key={key} position={position} colorOverride={'#ffffff'} />
      );
    } else if (index <= step) {
      return <Disc key={key} position={position} colorOverride={'#569874'} />;
    }
    return <Disc key={key} position={position} />;
  };

  const buildPrize = (base: Vector3) => {
    const finalPosition = regularTranslate(
      base,
      currentDirection,
      widthIncrement
    );
    stepPositions.push({ pos: finalPosition, direction: currentDirection });
    return <Prize position={finalPosition} modelPath={prizePath} />;
  };

  return (
    <>
      {[...Array(numStages)].map((_, i) => {
        const nextDirection = nextDirectionACW(currentDirection);
        const dv = getDirectionVector(currentDirection) as number[];
        const nextDv = getDirectionVector(nextDirection) as number[];
        const stageIncrement = 3;

        const stage = (
          <group key={i}>
            {buildDiagonalRepeated({
              buildBlock: (key: number, position: Vector3) =>
                buidDisc(key, position, i * width + key + 1),
              base: base,
              width: width - 1,
              widthIncrement: widthIncrement,
              heightIncrement: heightIncrement * (i + 1),
              repeatDirection: currentDirection,
              buildCallback: (position: Vector3) => {
                stepPositions.push({
                  pos: position,
                  direction: currentDirection,
                });
                base = position;
              },
            })}
            <Island
              key={(i + 1) * width}
              position={translate(
                regularTranslate(base, currentDirection, widthIncrement),
                {
                  [Axis.X]: nextDv[0],
                  [Axis.Y]: 0.5,
                  [Axis.Z]: nextDv[1],
                }
              )}
              direction={nextDirection}
              ladderHeight={stageIncrement}
            />
          </group>
        );
        base = regularTranslate(base, currentDirection, widthIncrement);
        stepPositions.push({
          pos: base,
          direction: currentDirection,
        });
        currentDirection = nextDirection;
        base = translate(base, {
          [Axis.X]: dv[0] + nextDv[0] * (widthIncrement + 1),
          [Axis.Y]: stageIncrement,
          [Axis.Z]: dv[1] + nextDv[1] * (widthIncrement + 1),
        });

        return stage;
      })}
      {buildDiagonalRepeated({
        buildBlock: (key: number, position: Vector3) =>
          buidDisc(key, position, numStages * width + key + 1),
        base: base,
        width: numSteps % width,
        widthIncrement: widthIncrement,
        heightIncrement: heightIncrement,
        repeatDirection: currentDirection,
        buildCallback: (position: Vector3) => {
          stepPositions.push({
            pos: position,
            direction: currentDirection,
          });
          base = position;
        },
      })}
      {buildPrize(base)}
    </>
  );
};

export default forwardRef(SpaceMapStructure);
