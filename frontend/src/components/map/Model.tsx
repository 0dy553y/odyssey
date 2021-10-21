import React from 'react';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { MapComponent } from './MapComponent';

interface ModelProps {
  fileName: string;
  scale?: number;
}

const Model: React.FC<ModelProps> = ({ fileName, scale = 1 }) => {
  const materials = useLoader(MTLLoader, `/${fileName}.mtl`);
  const obj = useLoader(OBJLoader, `/${fileName}.obj`, (loader: any) => {
    materials.preload();
    loader.setMaterials(materials);
  });
  return <primitive object={obj} scale={scale} />;
};

export default MapComponent(Model);
