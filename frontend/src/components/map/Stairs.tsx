import React from 'react';
import { MapComponent, Color } from './MapComponent';

export const Stairs: React.FC<Color> = ({ color }) => {
  const numSteps = 6;
  const increment = 1 / numSteps;

  return (
    <>
      {[...Array(numSteps)].map((_, i) => (
        <mesh
          key={i}
          position={[
            0.5 - increment / 2 - i * increment,
            -0.5 + ((i + 1) * increment) / 2,
            0,
          ]}
        >
          <boxGeometry args={[increment, (i + 1) * increment, 1]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}
    </>
  );
};

export default MapComponent(Stairs);
