import React, { useState, useRef, Suspense } from 'react';
import SpaceMapStructure from './SpaceMapStructure';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Character } from '../../components/map';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Direction } from '../../types/map';
import { DirectionPosition } from '../../types/map';

const SpaceMap: React.FC = () => {
  const numSteps = 30;
  let currentStep = 10;
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

  return (
    <Suspense fallback={<div />}>
      <Canvas camera={{ zoom: 15, position: [d, d, d] }} orthographic={true}>
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
          position={charPosition.pos}
          direction={charPosition.direction}
        />
        <OrbitControls
          addEventListener={undefined}
          hasEventListener={undefined}
          removeEventListener={undefined}
          dispatchEvent={undefined}
        />
        <Stars factor={10} radius={60} saturation={1} fade />
      </Canvas>
      <button onClick={() => moveCharacterBackward()}> previous </button>
      <button onClick={() => moveCharacterForward()}> next </button>
    </Suspense>
  );
};

export default SpaceMap;
