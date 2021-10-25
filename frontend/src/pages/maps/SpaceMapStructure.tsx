import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Vector3 } from '@react-three/fiber';
import { Island, Disc, NextDisc } from '../../components/map';

import { Direction, Axis } from '../../types/map';
import { translate, buildDiagonalRepeated } from '../../utils/map';
import { DirectionPosition } from '../../types/map';
import { getDirectionVector, nextDirectionACW } from '../../utils/direction';

interface MapProps {
  numSteps: number;
  currentStep: number;
  width: number;
  widthIncrement: number;
  heightIncrement: number;
  onMapMounted: (
    pos: Vector3[],
    setStep: React.Dispatch<React.SetStateAction<number>>
  ) => void;
}

const SpaceMapStructure = (props: MapProps, ref) => {
  const {
    numSteps,
    currentStep,
    width,
    widthIncrement,
    heightIncrement,
    onMapMounted,
  } = props;
  const numStages = Math.floor(numSteps / width);
  let base = [width * widthIncrement, -4, width * widthIncrement];
  let currentDirection = Direction.RIGHT;

  const [step, setStep] = useState(currentStep);
  const stepPositions: DirectionPosition[] = [];

  useEffect(() => {
    onMapMounted(stepPositions, setStep);
  }, []);

  useImperativeHandle(ref, () => ({
    setCurrentStep: (step: number) => {
      setStep(step);
    },
  }));

  const buidDisc = (
    key: number,
    position: number,
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

  return (
    <>
      {[...Array(numStages)].map((_, i) => {
        const nextDirection = nextDirectionACW(currentDirection);
        const dv = getDirectionVector(currentDirection);
        const nextDv = getDirectionVector(nextDirection);
        const stageIncrement = 3;

        const endPosition = translate(base, {
          [Axis.X]: dv[0] * widthIncrement * (width - 1),
          [Axis.Y]: heightIncrement * (width - 1) * (i + 1),
          [Axis.Z]: dv[1] * widthIncrement * (width - 1),
        });

        const stage = (
          <>
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
              },
            })}
            <Island
              key={i}
              position={translate(endPosition, {
                [Axis.X]: nextDv[0],
                [Axis.Y]: 0.5,
                [Axis.Z]: nextDv[1],
              })}
              direction={nextDirection}
              ladderHeight={stageIncrement}
            />
          </>
        );
        stepPositions.push({
          pos: endPosition.slice(),
          direction: currentDirection,
        });
        currentDirection = nextDirection;
        base = translate(endPosition, {
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
        },
      })}
    </>
  );
};

export default forwardRef(SpaceMapStructure);
