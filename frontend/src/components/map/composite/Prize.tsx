/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import { ModelFileFormat } from 'types/map';
import { MapComponent } from '../basic/MapComponent';
import Model from '../basic/Model';

interface PrizeProps {
  modelPath: string;
  scale?: number;
}

const Prize: React.FC<PrizeProps> = ({ modelPath, scale = 0.8 }) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current !== undefined) {
      (ref.current as any).rotation.y = -clock.getElapsedTime() / 2;
    }
  });
  return (
    <group ref={ref}>
      <Model
        position={[0, 0, 0]}
        modelFile={{ path: modelPath, format: ModelFileFormat.OBJ }}
        scale={scale}
      />
    </group>
  );
};

export default MapComponent(Prize);
