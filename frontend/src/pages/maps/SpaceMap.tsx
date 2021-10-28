import React, { useState, useRef, Suspense } from 'react';
import SpaceMapStructure from './SpaceMapStructure';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Box, Character } from '../../components/map';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Direction } from '../../types/map';
import { DirectionPosition } from '../../types/map';

interface MapProps {
  numSteps: number;
  currentStep: number;
}

const mockFriends: Map<number, string[]> = new Map([
  [1, ['Mario']],
  [2, ['Mochi', 'Margikarp']],
]);

const SpaceMap: React.FC<MapProps> = ({ numSteps, currentStep }) => {
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

  const spawnFriends = () => {
    for (const sharedStep in Array.from(mockFriends.keys())) {
      console.log(sharedStep);
    }

    return (
      <>
        {Array.from(mockFriends.keys()).map((sharedStep: number) => (
          <Box
            key={sharedStep}
            position={stepPositions[sharedStep - 1].pos}
            direction={stepPositions[sharedStep - 1].direction}
          />
        ))}
      </>
    );
  };

  const moveCharacterForward = () => {
    currentStep = currentStep + 1;
    if (characterRef.current !== undefined && mapRef.current !== undefined) {
      (characterRef.current as any).moveCharacter(
        stepPositions[currentStep - 2],
        stepPositions[currentStep - 1]
      );
      (mapRef.current as any).setCurrentStep(currentStep);
    }
  };

  const moveCharacterBackward = () => {
    currentStep = currentStep - 1;
    if (characterRef.current !== undefined && mapRef.current !== undefined) {
      (characterRef.current as any).moveCharacter(
        stepPositions[currentStep],
        stepPositions[currentStep - 1]
      );
      (mapRef.current as any).setCurrentStep(currentStep);
    }
  };

  const d = 35;
  const cameraZoom = 45 - numSteps * 1.5;

  return (
    <Suspense fallback={<div />}>
      {/* <button onClick={() => moveCharacterBackward()}> previous </button>
      <button onClick={() => moveCharacterForward()}> next </button> */}
      <Canvas
        camera={{ zoom: cameraZoom, position: [d, d, d] }}
        orthographic={true}
      >
        <color attach="background" args={['#010101']} />
        {/*  x: red, y: green, z: blue */}
        {/* <axesHelper args={[5]} /> */}
        {/* <EffectComposer>
          <Bloom
            luminanceThreshold={0.8}
            intensity={1.5}
            luminanceSmoothing={0.1}
          />
        </EffectComposer> */}
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
          key={charPosition.pos as unknown as string}
          position={charPosition.pos}
          direction={charPosition.direction}
          username="unclesoo"
        />
        {spawnFriends}
        {/* <OrbitControls
          addEventListener={undefined}
          hasEventListener={undefined}
          removeEventListener={undefined}
          dispatchEvent={undefined}
        /> */}
        <Stars factor={10} radius={60 - cameraZoom} saturation={1} fade />
      </Canvas>
    </Suspense>
  );
};

export default SpaceMap;
