import React from 'react';
import { Direction } from 'types/map';
import { Box, Stairs } from '..';
import HalfArch from '../basic/HalfArch';
import { Color, MapComponent } from '../basic/MapComponent';

const StairBox: React.FC<Color> = ({ color }) => {
  return (
    <>
      <Stairs colorOverride={color} position={[0, -0.5, -1]} />
      <Box colorOverride={color} position={[0, -0.5, 0]} />
      <HalfArch
        colorOverride={color}
        position={[0, -0.5, 2]}
        direction={Direction.LEFT}
        width={2}
      />
    </>
  );
};

export default MapComponent(StairBox);
