import React, { Suspense } from 'react';
import { Canvas, Vector3 } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { ThemeProvider } from '@material-ui/styles';
import { Box, Character, Ladder, Model, Stairs } from '../../components/map';
import { Direction, Axis } from '../../types/map';
import { translate, buildRepeated, buildArch } from '../../utils/map';
import theme from './DemoMapTheme';

function Map(): JSX.Element {
  const base: Vector3 = [-1, -4, 5];
  const d = 35;

  return (
    <Suspense fallback={<div />}>
      <ThemeProvider theme={theme}>
        <Canvas camera={{ zoom: 30, position: [d, d, d] }} orthographic={true}>
          <color attach="background" args={['#1C1C1C']} />
          {/*  x: red, y: green, z: blue */}
          <axesHelper args={[5]} />
          <directionalLight castShadow position={[0, 10, 0]} intensity={1.5} />
          <pointLight position={[30, 0, 0]} intensity={0.5} />
          <pointLight position={[-30, 0, 0]} intensity={0.5} />
          <pointLight position={[0, 0, 30]} intensity={0.2} />
          <pointLight position={[0, 0, -30]} intensity={0.2} />
          <Character position={base} direction={Direction.RIGHT} />
          <Model
            position={translate(base, { [Axis.Y]: 5, [Axis.Z]: -5 })}
            fileName="InterstellarRunner"
            direction={Direction.RIGHT}
          />
          <Stairs position={base} direction={Direction.FORWARD} />
          {buildRepeated({
            buildBlock: (key: number, position: Vector3) => (
              <Box key={key} position={position} />
            ),
            base: translate(base, { [Axis.Z]: -1 }),
            width: 4,
            repeatDirection: Direction.RIGHT,
          })}
          <Stairs
            position={[base[0], base[1] + 1, base[2] - 2]}
            direction={Direction.FORWARD}
          />
          {buildRepeated({
            buildBlock: (key: number, position: Vector3) => (
              <Box key={key} position={position} />
            ),
            base: translate(base, { [Axis.Y]: 1, [Axis.Z]: -3 }),
            width: 2,
            repeatDirection: Direction.RIGHT,
          })}
          <Stairs
            position={[base[0], base[1] + 2, base[2] - 4]}
            direction={Direction.FORWARD}
          />
          {buildRepeated({
            buildBlock: (key: number, position: Vector3) => (
              <Box key={key} position={position} />
            ),
            base: translate(base, { [Axis.Z]: -5 }),
            width: 2,
            height: 3,
            repeatDirection: Direction.BACKWARD,
          })}
          {buildRepeated({
            buildBlock: (key: number, position: Vector3) =>
              buildArch({
                base: position,
                direction: Direction.BACKWARD,
                width: 1,
                height: 3,
                key: key,
              }),
            base: translate(base, { [Axis.X]: 2, [Axis.Z]: -5 }),
            width: 3,
            widthIncrement: 1,
            heightIncrement: 3,
            repeatDirection: Direction.BACKWARD,
          })}

          {buildRepeated({
            buildBlock: (key: number, position: Vector3) => (
              <Box key={key} position={position} />
            ),
            base: translate(base, { [Axis.X]: 5, [Axis.Z]: -5 }),
            width: 2,
            height: 3,
            repeatDirection: Direction.RIGHT,
          })}
          {buildRepeated({
            buildBlock: (key: number, position: Vector3) => (
              <Ladder
                key={key}
                position={position}
                direction={Direction.LEFT}
              />
            ),
            base: translate(base, { [Axis.X]: 5, [Axis.Y]: 3, [Axis.Z]: -6 }),
            height: 3,
            repeatDirection: Direction.RIGHT,
          })}

          <OrbitControls
            addEventListener={undefined}
            hasEventListener={undefined}
            removeEventListener={undefined}
            dispatchEvent={undefined}
          />
          <Stars factor={10} radius={50} />
        </Canvas>
      </ThemeProvider>
    </Suspense>
  );
}

export default Map;
