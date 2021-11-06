/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense } from 'react';
import { Canvas, Euler, Vector3 } from '@react-three/fiber';
import { Model } from 'components/map';

import { getCharacterPath } from 'utils/map';
import { animated, config, useSpring } from '@react-spring/three';

interface CharacterDisplayProps {
  character: string;
  isActive?: boolean;
  scaleOverride?: number;
  position?: Vector3;
  rotation?: Euler;
  zoom?: number;
  isAnimated?: boolean;
}

const CharacterDisplay: React.FC<CharacterDisplayProps> = ({
  character,
  isActive = false,
  scaleOverride,
  position = [0, -2, 0],
  rotation = [Math.PI / 8, Math.PI / 3, 0],
  zoom = 20,
  isAnimated = false,
}) => {
  const { scale } = useSpring({
    scale: isActive ? 3 : 2,
    config: config.wobbly,
  });

  const { localPos } = useSpring({
    loop: true,
    from: { localPos: [0, -3.2, 0] },
    to: [{ localPos: [0, -2.8, 0] }, { localPos: [0, -3.2, 0] }],
    config: { ...config.slow, duration: 1000 },
  });
  return (
    <>
      <Suspense fallback={<div />}>
        <Canvas camera={{ zoom: zoom }} orthographic={true}>
          <directionalLight position={[0, 10, 0]} intensity={0.8} />
          <directionalLight position={[10, 0, 0]} intensity={0.2} />
          <directionalLight position={[0, 0, 10]} intensity={0.75} />

          <animated.group rotation={rotation}>
            <Model
              position={isAnimated ? (localPos as any as Vector3) : position}
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
