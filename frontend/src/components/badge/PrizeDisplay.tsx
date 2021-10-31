import React, { Suspense } from 'react';
import { Canvas, Vector3 } from '@react-three/fiber';
import Prize from 'components/map/composite/Prize';
import { Box, OrbitControls } from '@react-three/drei';
import { translate } from 'utils/map';
import { Axis } from 'types/map';

interface PrizeDisplayProps {
  prizes: string[];
}
const PrizeDisplay: React.FC<PrizeDisplayProps> = ({ prizes }) => {
  const numPrizesInRow = 3;
  const prizePositions: Vector3[] = [];
  let base: Vector3 = [-4, 8, 0];
  const rowIncrement = 12 / numPrizesInRow;
  const colIncrement = 3;

  for (let i = 0; i < prizes.length; i++) {
    prizePositions.push(base);

    if ((i + 1) % numPrizesInRow === 0) {
      base = translate(base, { [Axis.Y]: -colIncrement });
      (base as number[])[0] = -4;
    } else {
      base = translate(base, { [Axis.X]: rowIncrement });
    }
  }

  return (
    <Suspense fallback="<div/>">
      <Canvas camera={{ zoom: 30 }} orthographic={true}>
        <axesHelper />
        <directionalLight castShadow position={[0, 10, 0]} intensity={1.5} />
        <directionalLight castShadow position={[10, 0, 0]} intensity={0.3} />
        <directionalLight castShadow position={[-10, 0, 0]} intensity={0.2} />
        <directionalLight castShadow position={[0, 0, 10]} intensity={0.4} />

        {prizePositions.length === prizes.length ? (
          prizes.map((prizePath: string, index: number) => {
            return (
              <Prize
                key={`${prizePath}${index}`}
                position={prizePositions[index]}
                modelPath={prizePath}
                scale={1.5}
              />
            );
          })
        ) : (
          <></>
        )}
      </Canvas>
    </Suspense>
  );
};

export default PrizeDisplay;
