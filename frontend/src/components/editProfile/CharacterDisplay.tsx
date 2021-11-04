import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Model } from 'components/map';

import { getCharacterPath } from 'utils/map';

interface CharacterDisplayProps {
  character: string;
  isActive: boolean;
}

const CharacterDisplay: React.FC<CharacterDisplayProps> = ({
  character,
  isActive,
}) => {
  return (
    <>
      <Suspense fallback={<div />}>
        <Canvas camera={{ zoom: 20 }} orthographic={true}>
          <axesHelper />
          <directionalLight position={[0, 10, 0]} intensity={0.8} />
          <directionalLight position={[10, 0, 0]} intensity={0.2} />
          <directionalLight position={[0, 0, 10]} intensity={0.75} />

          <group rotation={[Math.PI / 8, Math.PI / 3, 0]}>
            <Model
              position={isActive ? [0, -2, 0] : [0, -1, 0]}
              scale={isActive ? 3 : 2}
              fileName={getCharacterPath(character)}
            />
          </group>
        </Canvas>
      </Suspense>
    </>
  );
};

export default CharacterDisplay;
