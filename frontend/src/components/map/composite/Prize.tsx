import React from 'react';
import { MapComponent } from '../basic/MapComponent';
import Model from '../basic/Model';

const Prize: React.FC = () => {
  return (
    <>
      <Model position={[0, 0, 0]} fileName={'shoe'} scale={0.8} />
    </>
  );
};

export default MapComponent(Prize);
