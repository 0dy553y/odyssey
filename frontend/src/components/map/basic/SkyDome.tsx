import { useTexture } from '@react-three/drei';
import React from 'react';
import { BackSide } from 'three';

const SkyDome: React.FC = () => {
  const skyTexture = useTexture('/textures/purpleblue.png');
  return (
    <mesh>
      <sphereGeometry args={[80, 25, 25]} />
      <meshPhongMaterial side={BackSide} map={skyTexture} />
    </mesh>
  );
};

export default SkyDome;
