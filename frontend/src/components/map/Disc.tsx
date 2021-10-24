import React from 'react';
import { Color, MapComponent } from './MapComponent';

interface DiscProps extends Color {
  thickness?: number;
}

export const Disc: React.FC<DiscProps> = ({ color, thickness = 0.2 }) => {
  return (
    <mesh>
      <boxGeometry args={[1, thickness, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default MapComponent(Disc);
