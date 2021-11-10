import { useTexture } from '@react-three/drei';
import React from 'react';
import { BackSide } from 'three';

interface SkyDomeProps {
  texturePath: string;
}

const SkyDome: React.FC<SkyDomeProps> = ({ texturePath }) => {
  const skyTexture = useTexture(`${texturePath}.png`);
  return (
    <mesh>
      <sphereGeometry args={[80, 25, 25]} />
      <meshPhongMaterial side={BackSide} map={skyTexture} />
    </mesh>
  );
};

export default SkyDome;
