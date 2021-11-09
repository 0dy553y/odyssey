import { useTexture } from '@react-three/drei';
import React from 'react';
import { BackSide } from 'three';

const SkyDome: React.FC = () => {
  const skyTexture = useTexture('/textures/sky.jpeg');
  return (
    <mesh>
      <sphereGeometry args={[70, 25, 25]} />
      <meshPhongMaterial side={BackSide} map={skyTexture} />
    </mesh>
  );
};

export default SkyDome;
