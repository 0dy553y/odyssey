/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import { MapComponent } from '../basic/MapComponent';
import Model from '../basic/Model';

interface PrizeProps {
  modelPath?: string;
}

const Prize: React.FC<PrizeProps> = ({ modelPath = 'trophy' }) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current !== undefined) {
      (ref.current as any).rotation.y = -clock.getElapsedTime() / 2;
    }
  });
  return (
    <group ref={ref}>
      <Model position={[0, 0, 0]} fileName={modelPath} scale={0.8} />
    </group>
  );
};

export default MapComponent(Prize);
