import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Model } from 'components/map';

import { getCharacterPath } from 'utils/map';
import { animated, config, useSpring } from '@react-spring/three';

interface CharacterDisplayProps {
  character: string;
  isActive?: boolean;
  scaleOverride?: number;
}

const CharacterDisplay: React.FC<CharacterDisplayProps> = ({
  character,
  isActive = false,
  scaleOverride,
}) => {
  const { scale } = useSpring({
    scale: isActive ? 3 : 2,
    config: config.wobbly,
  });
  return (
    <>
      <Suspense fallback={<div />}>
        <Canvas camera={{ zoom: 20 }} orthographic={true}>
          <directionalLight position={[0, 10, 0]} intensity={0.8} />
          <directionalLight position={[10, 0, 0]} intensity={0.2} />
          <directionalLight position={[0, 0, 10]} intensity={0.75} />

          <animated.group rotation={[Math.PI / 8, Math.PI / 3, 0]}>
            <Model
              position={[0, -2, 0]}
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
