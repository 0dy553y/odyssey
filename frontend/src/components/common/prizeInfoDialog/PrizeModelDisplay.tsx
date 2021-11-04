import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import PrizeModel from 'components/map/composite/Prize';

interface PrizeModelDisplayProps {
  prizePath: string;
}

const PrizeModelDisplay: React.FC<PrizeModelDisplayProps> = ({ prizePath }) => {
  return (
    <Canvas camera={{ zoom: 30 }} orthographic={true}>
      <ambientLight intensity={0.5} />
      <PrizeModel position={[0, -1, 0]} modelPath={prizePath} scale={2} />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
};

export default PrizeModelDisplay;
