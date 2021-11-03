import React, { Suspense, useEffect, useState } from 'react';
import { Canvas, Vector3 } from '@react-three/fiber';
import PrizeModel from 'components/map/composite/Prize';
import { translate } from 'utils/map';
import { Axis } from 'types/map';
import { Html } from '@react-three/drei';
import { PrizeWithChallengeName } from '../../pages/badge/BadgePage';

interface PrizeDisplayProps {
  prizes: PrizeWithChallengeName[];
  onPrizeOpen: (p: PrizeWithChallengeName) => void;
  showName: boolean;
}

const PrizeDisplay: React.FC<PrizeDisplayProps> = ({
  prizes,
  onPrizeOpen,
  showName,
}) => {
  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  };

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  console.log(windowDimensions);

  // 30 pixels for one unit in canvas.
  const pixelToCoordRatio = 30;
  const horizontalMargin = 60;
  const topMargin = 32;
  const adjustedWidth = Math.min(windowDimensions.width, 600);

  const baseX = -(adjustedWidth / 2 - horizontalMargin) / pixelToCoordRatio;
  const baseY = (windowDimensions.height * 0.4 - topMargin) / pixelToCoordRatio;

  const numPrizesInRow = 3;
  const prizePositions: Vector3[] = [];
  let base: Vector3 = [baseX, baseY, 0];
  const rowIncrement =
    (adjustedWidth - 2 * horizontalMargin) /
    pixelToCoordRatio /
    (numPrizesInRow - 1);
  const colIncrement = 4;

  for (let i = 0; i < prizes.length; i++) {
    prizePositions.push(base);

    if ((i + 1) % numPrizesInRow === 0) {
      base = translate(base, { [Axis.Y]: -colIncrement });
      (base as number[])[0] = baseX;
    } else {
      base = translate(base, { [Axis.X]: rowIncrement });
    }
  }

  return (
    <Suspense fallback={<div />}>
      <Canvas camera={{ zoom: 30 }} orthographic={true}>
        <ambientLight intensity={0.5} />

        {prizes.map((p: PrizeWithChallengeName, index: number) => {
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
