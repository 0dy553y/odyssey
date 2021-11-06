/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense, useState } from 'react';
import { Canvas, Euler, Vector3 } from '@react-three/fiber';
import { Model } from 'components/map';

import { getCharacterPath } from 'utils/map';
import { animated, config, useSpring } from '@react-spring/three';

interface CharacterDisplayProps {
  character: string;
  isActive?: boolean;
  scaleOverride?: number;
  positionOverride?: Vector3;
  rotationOverride?: Euler;
  zoomOverride?: number;
  isAnimated?: boolean;
}

const CharacterDisplay: React.FC<CharacterDisplayProps> = ({
  character,
  isActive = false,
  scaleOverride,
  positionOverride,
  rotationOverride,
  zoomOverride,
  isAnimated = false,
}) => {
  const [flip, set] = useState(false);

  const { scale } = useSpring({
    scale: isActive ? 3 : 2,
    config: config.wobbly,
  });

  const { localPos } = useSpring({
    reset: true,
    from: { localPos: [0, -3.2, 0] },
    reverse: flip,
    localPos: [0, -2.8, 0],
    delay: 200,
    config: { ...config.slow, duration: 1000 },
    onRest: () => set(!flip),
  });
  return (
    <>
      <Suspense fallback={<div />}>
        <Canvas
          camera={{ zoom: zoomOverride ? zoomOverride : 20 }}
          orthographic={true}
        >
          <directionalLight position={[0, 10, 0]} intensity={0.8} />
          <directionalLight position={[10, 0, 0]} intensity={0.2} />
          <directionalLight position={[0, 0, 10]} intensity={0.75} />

          <animated.group
            rotation={
              rotationOverride
                ? rotationOverride
                : [Math.PI / 8, Math.PI / 3, 0]
            }
          >
            <Model
              position={
                isAnimated
                  ? (localPos as any as Vector3)
                  : positionOverride
                  ? positionOverride
                  : [0, -2, 0]
              }
              scale={scaleOverride ? scaleOverride : scale}
              fileName={getCharacterPath(character)}
            />
          </animated.group>
        </Canvas>
      </Suspense>
    </>
  );
};

export default CharacterDisplay;
