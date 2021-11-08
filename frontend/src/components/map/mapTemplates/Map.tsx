/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import MapStructure from './MapStructure';
import { useThree } from '@react-three/fiber';
import { MapControls, Sky, Stars } from '@react-three/drei';
import { Character } from '..';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Axis, Direction } from '../../../types/map';
import { DirectionPosition } from '../../../types/map';
import { getDirectionVector, nextDirectionCW } from 'utils/direction';
import {
  getCameraPosition,
  getCameraZoomForDesktop,
  getCameraZoomForMobile,
  getMapBackground,
  translate,
} from 'utils/map';
import {
  UserChallengeFriendMapData,
  UserChallengeMapData,
} from 'types/userchallenge';
import { getPrizePath } from 'utils/prizes';
import SkyDome from '../basic/SkyDome';

interface MapProps {
  mapData: UserChallengeMapData;
  setIsPrizeModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDesktop: boolean;
}

const Map = (props: MapProps, ref: React.Ref<unknown>) => {
  const { mapData, setIsPrizeModalOpen, isDesktop } = props;
  const {
    username,
    character,
    challengeName,
    prizeName,
    numTasks,
    currentTaskNum,
    friends,
    mapTheme,
  } = mapData;
  let currentStep = currentTaskNum;
  const numSteps = numTasks;
  const friendsPositions: Record<number, UserChallengeFriendMapData[]> = {};
  friends.map((f: UserChallengeFriendMapData) => {
    if (!(f.currentTaskNum in friendsPositions)) {
      friendsPositions[f.currentTaskNum] = [];
    }
    friendsPositions[f.currentTaskNum].push(f);
  });
  const [stepPositions, setStepPositions] = useState<DirectionPosition[]>([]);
  const [charPosition, setCharPosition] = useState<DirectionPosition>({
    pos: [0, 0, 0],
    direction: Direction.FORWARD,
  });
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);
  const [shouldMoveCharacterForward, setShouldMoveCharacterForward] =
    useState<boolean>(false);
  const width = 7;
  const characterRef = useRef();
  const mapRef = useRef();
  const { camera } = useThree();

  useEffect(() => {
    if (stepPositions.length === numTasks + 1) {
      setIsMapLoaded(true);
    }
  }, [stepPositions]);

  useEffect(() => {
    if (
      isMapLoaded &&
      shouldMoveCharacterForward &&
      characterRef.current !== undefined &&
      mapRef.current !== undefined
    ) {
      currentStep = currentStep + 1;
      setTimeout(() => {
        (characterRef.current as any).moveCharacter(
          stepPositions[currentStep - 2],
          stepPositions[currentStep - 1]
        );
        setShouldMoveCharacterForward(false);
        (mapRef.current as any).setCurrentStep(currentStep);
      }, 500);
    }
  }, [isMapLoaded]);

  useImperativeHandle(ref, () => ({
    moveCharacterForward() {
      setShouldMoveCharacterForward(true);
    },

    moveCharacterBackward() {
      if (characterRef.current !== undefined && mapRef.current !== undefined) {
        setTimeout(() => {
          currentStep = currentStep - 1;
          (characterRef.current as any).moveCharacter(
            stepPositions[currentStep],
            stepPositions[currentStep - 1]
          );
        }, 500);
        (mapRef.current as any).setCurrentStep(currentStep);
      }
    },

    isMapLoaded() {
      return isMapLoaded;
    },
  }));

  const cameraZoom = isDesktop
    ? getCameraZoomForDesktop(numSteps)
    : getCameraZoomForMobile(numSteps);

  useEffect(() => {
    const cameraPosition = getCameraPosition(
      charPosition.direction
    ) as number[];
    camera.position.set(
      cameraPosition[0],
      cameraPosition[1],
      cameraPosition[2]
    );
    camera.zoom = cameraZoom;
    camera.updateProjectionMatrix();
  }, [isMapLoaded]);

  return (
    <>
      {/*  x: red, y: green, z: blue */}
      {/* <axesHelper args={[5]} /> */}
      {/* {isMapLoaded ? (
            <EffectComposer>
              <Bloom
                luminanceThreshold={0.8}
                intensity={1.5}
                luminanceSmoothing={0.1}
              />
            </EffectComposer>
          ) : (
            <></>
          )} */}

      <MapStructure
        ref={mapRef}
        numSteps={numSteps}
        currentStep={currentStep}
        width={width}
        prizePath={getPrizePath(prizeName)}
        onMapMounted={(stepPositions) => {
          setStepPositions(stepPositions);
          setCharPosition(stepPositions[currentStep - 1]);
        }}
        onClickPrize={() => setIsPrizeModalOpen(true)}
        mapTheme={mapTheme}
      />
      <Character
        ref={characterRef}
        key={`${challengeName}-${charPosition.pos as unknown as string}`}
        position={charPosition.pos}
        direction={charPosition.direction}
        username={username}
        character={character}
      />
      {/* spawn friends */}
      {isMapLoaded ? (
        <>
          {Object.keys(friendsPositions).map((step: string) =>
            friendsPositions[Number(step)].map(
              ({ username, character }, index: number) => {
                const { pos, direction } = stepPositions[Number(step) - 1];
                const dv = getDirectionVector(
                  nextDirectionCW(direction)
                ) as number[];
                return (
                  <Character
                    key={`${challengeName}-${username}`}
                    position={translate(pos, {
                      [Axis.X]: dv[0] * (index + 1) * 2,
                      [Axis.Z]: dv[1] * (index + 1) * 2,
                    })}
                    direction={direction}
                    username={username}
                    character={character}
                  />
                );
              }
            )
          )}
        </>
      ) : (
        <></>
      )}
      <MapControls
        addEventListener={undefined}
        hasEventListener={undefined}
        removeEventListener={undefined}
        dispatchEvent={undefined}
        minZoom={cameraZoom - 8}
      />
      {getMapBackground(mapTheme.background, cameraZoom)}
    </>
  );
};

export default forwardRef(Map);
