import React, { useState, useEffect, useRef } from 'react';
import SpaceMapStructure from './SpaceMapStructure';
import { Canvas, Vector3 } from '@react-three/fiber';
import { MapControls, Stars } from '@react-three/drei';
import { ThemeProvider } from '@mui/styles';
import { Character } from '../../components/map';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Direction, Axis } from '../../types/map';
import {
  translate,
  buildRepeated,
  buildDiagonalRepeated,
  buildArch,
} from '../../utils/map';
import theme from './SpaceMapTheme';
import { DirectionPosition } from '../../types/map';
import { getDirectionVector, nextDirectionACW } from '../../utils/direction';
import { useSpring, Controller, animated, config } from '@react-spring/three';

interface MapProps {
  numSteps: number;
  currentStep: number;
}

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
  const character = characterRef.current;
  const [styles, api] = useSpring(() => ({
    from: { pos: charPosition.pos },
  }));
  console.log(stepPositions);
  console.log(charPosition);

  const moveCharacterForward = () => {
    currentStep = currentStep + 1;
    // setCharPosition(stepPositions[currentStep]);

    api.start({
      to: { pos: stepPositions[currentStep] },
    });
  };

  const moveCharacterBackward = () => {
    currentStep = currentStep - 1;
    setCharPosition(stepPositions[currentStep]);
    if (character !== undefined) {
      character.moveCharacter();
    }
  };

  const d = 35;

  return (
    <ThemeProvider theme={theme}>
      <>
        <Canvas camera={{ zoom: 15, position: [d, d, d] }} orthographic={true}>
          <color attach="background" args={['#010101']} />
          {/*  x: red, y: green, z: blue */}
          <axesHelper args={[5]} />
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
            numSteps={numSteps}
            currentStep={currentStep}
            width={width}
            widthIncrement={widthIncrement}
            heightIncrement={heightIncrement}
            setStepPositions={(stepPositions) => {
              setStepPositions(stepPositions);
              setCharPosition(stepPositions[currentStep - 1]);
            }}
          />

          <Character
            ref={characterRef}
            position={charPosition.pos}
            direction={charPosition.direction}
          />
          <MapControls />
          <Stars factor={10} radius={60} saturation={1} fade />
        </Canvas>
        <button onClick={() => moveCharacterBackward()}> previous </button>
        <button onClick={() => moveCharacterForward()}> next </button>
      </>
    </ThemeProvider>
  );
};

export default SpaceMap;
