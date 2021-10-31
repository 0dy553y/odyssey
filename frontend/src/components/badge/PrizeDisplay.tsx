import React, { Suspense } from 'react';
import { Canvas, Vector3 } from '@react-three/fiber';
import PrizeModel from 'components/map/composite/Prize';
import { translate } from 'utils/map';
import { Axis } from 'types/map';
import { Prize } from 'types/prize';
import { Html } from '@react-three/drei';

interface PrizeDisplayProps {
  prizes: Prize[];
  onPrizeOpen: (p: Prize) => void;
  showName: boolean;
}

const PrizeDisplay: React.FC<PrizeDisplayProps> = ({
  prizes,
  onPrizeOpen,
  showName,
}) => {
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
        <ambientLight intensity={0.5} />

        {prizes.map((p: Prize, index: number) => {
          return (
            <group
              key={`${p.prizeName}${index}`}
              onClick={() => {
                onPrizeOpen(p);
              }}
              position={prizePositions[index]}
            >
              <PrizeModel
                position={[0, 0, 0]}
                modelPath={p.prizePath}
                scale={1.5}
              />
              {showName ? (
                <Html position={[0, -0.8, 0]} center>
                  <p>{p.prizeName}</p>
                </Html>
              ) : (
                <></>
              )}
            </group>
          );
        })}
      </Canvas>
    </Suspense>
  );
};

export default PrizeDisplay;
