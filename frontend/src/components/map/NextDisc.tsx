import React, { useRef } from 'react';
import { Color, MapComponent } from './MapComponent';
import { useFrame } from '@react-three/fiber';

import { Disc } from './Disc';

interface NextDiscProps extends Color {
  thickness?: number;
}

const NextDisc: React.FC<NextDiscProps> = ({ color, thickness = 0.2 }) => {
  const ref = useRef();

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() / 2;
  });

  return (
    <group ref={ref}>
      <Disc color={color} thickness={thickness} />
    </group>
  );
};

export default MapComponent(NextDisc);
