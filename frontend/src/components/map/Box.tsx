import React from 'react';
import { Color, MapComponent } from './MapComponent';

const Box: React.FC<Color> = ({ color }) => {
  return (
    <mesh>
      <boxGeometry />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default MapComponent(Box);
