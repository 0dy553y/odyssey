import React from 'react';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

import { MapComponent } from './MapComponent';

const Character: React.FC = () => {
  const materials = useLoader(MTLLoader, '/astronaut.mtl');
  const astronaut = useLoader(OBJLoader, '/astronaut.obj', (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });
  return <primitive object={astronaut} scale={0.4} />;
};

export default MapComponent(Character);
