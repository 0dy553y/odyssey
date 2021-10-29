/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useState,
  useRef,
  Suspense,
  forwardRef,
  useImperativeHandle,
} from 'react';
import SpaceMapStructure from './SpaceMapStructure';
import { Canvas } from '@react-three/fiber';
import { MapControls, Stars } from '@react-three/drei';
import { Character } from '..';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Axis, Direction } from '../../../types/map';
import { DirectionPosition } from '../../../types/map';
import { getDirectionVector, nextDirectionCW } from 'utils/direction';
import { translate } from 'utils/map';
import { ChallengeMapData } from 'types/challenges';

interface MapProps {
  mapData: ChallengeMapData;
}

const SpaceMap = (props: MapProps, ref: React.Ref<unknown>) => {
  const { username, challengeName, numTasks, currentTaskNum, friends } =
    props.mapData;
  let currentStep = currentTaskNum;
  const numSteps = numTasks;
  const friendsPositions: Record<number, string[]> = {};
  friends.map(({ username, currentTaskNum }) => {
    if (!(currentTaskNum in friendsPositions)) {
      friendsPositions[currentTaskNum] = [];
    }
    friendsPositions[currentTaskNum].push(username);
  });
  const [stepPositions, setStepPositions] = useState<DirectionPosition[]>([]);
  const [charPosition, setCharPosition] = useState<DirectionPosition>({
    pos: [0, 0, 0],
    direction: Direction.FORWARD,
  });
  const width = 7;
  const widthIncrement = 1.5;
  const heightIncrement = 0.5;
  const characterRef = useRef();
  const mapRef = useRef();

  useImperativeHandle(ref, () => ({
    moveCharacterForward() {
      currentStep = currentStep + 1;
      if (characterRef.current !== undefined && mapRef.current !== undefined) {
        (characterRef.current as any).moveCharacter(
          stepPositions[currentStep - 2],
          stepPositions[currentStep - 1]
        );
        (mapRef.current as any).setCurrentStep(currentStep);
      }
    },

    moveCharacterBackward() {
      currentStep = currentStep - 1;
      if (characterRef.current !== undefined && mapRef.current !== undefined) {
        (characterRef.current as any).moveCharacter(
          stepPositions[currentStep],
          stepPositions[currentStep - 1]
        );
        (mapRef.current as any).setCurrentStep(currentStep);
      }
    },
  }));

  const d = 35;
  const cameraZoom = 45 - numSteps * 1.5;

  return (
    <Suspense fallback={<div />}>
      <Canvas
        camera={{ zoom: cameraZoom, position: [d, d, d] }}
        orthographic={true}
      >
        <color attach="background" args={['#010101']} />
        {/*  x: red, y: green, z: blue */}
        {/* <axesHelper args={[5]} /> */}
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.8}
            intensity={1.5}
            luminanceSmoothing={0.1}
          />
        </EffectComposer>
        <directionalLight castShadow position={[0, 10, 0]} intensity={1.5} />
        <pointLight position={[30, 0, 0]} intensity={0.5} />
        <pointLight position={[-30, 0, 0]} intensity={0.5} />
        <pointLight position={[0, 0, 30]} intensity={0.2} />
        <pointLight position={[0, 0, -30]} intensity={0.2} />
        <SpaceMapStructure
          ref={mapRef}
          numSteps={numSteps}
          currentStep={currentStep}
          width={width}
          widthIncrement={widthIncrement}
          heightIncrement={heightIncrement}
          onMapMounted={(stepPositions) => {
            setStepPositions(stepPositions);
            setCharPosition(stepPositions[currentStep - 1]);
          }}
        />
        <Character
          ref={characterRef}
          key={`${challengeName}-${charPosition.pos as unknown as string}`}
          position={charPosition.pos}
          direction={charPosition.direction}
          username={username}
        />
        {/* spawn friends */}
        {/* {stepPositions.length === numSteps ? (
          <>
            {Object.keys(friendsPositions).map((step: string) =>
              friendsPositions[Number(step)].map(
                (username: string, index: number) => {
                  const { pos, direction } = stepPositions[Number(step) - 1];
                  const dv = getDirectionVector(
                    nextDirectionCW(direction)
                  ) as number[];
                  return (
                    <Character
                      key={`${challengeName}-${username}`}
                      position={translate(pos, {
                        [Axis.X]: dv[0] * index * 2,
                        [Axis.Z]: dv[1] * index * 2,
                      })}
                      direction={direction}
                      username={username}
                    />
                  );
                }
              )
            )}
          </>
        ) : (
          <> </>
        )} */}
        <MapControls
          addEventListener={undefined}
          hasEventListener={undefined}
          removeEventListener={undefined}
          dispatchEvent={undefined}
        />
        <Stars factor={10} radius={60 - cameraZoom} saturation={1} fade />
      </Canvas>
    </Suspense>
  );
};

export default forwardRef(SpaceMap);
