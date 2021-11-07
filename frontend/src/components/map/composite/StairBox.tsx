import React from 'react';
import { Direction } from 'types/map';
import { Arch, Box, Stairs } from '..';
import { Color, MapComponent } from '../basic/MapComponent';

const StairBox: React.FC<Color> = ({ color }) => {
  return (
    <>
      <Stairs color={color} position={[0, 0, 0]} />
      <Box color={color} position={[0, 0, 1]} />
      <Arch
        color={color}
        position={[0, 0, 2]}
        direction={Direction.RIGHT}
        width={2}
      />
    </>
  );
};

export default MapComponent(StairBox);
