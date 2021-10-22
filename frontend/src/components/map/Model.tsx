import React from 'react';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { MapComponent } from './MapComponent';

interface ModelProps {
  fileName: string;
  scale?: number;
}

// Loads a voxel model.
// To add a new model, add its .obj, .mtl, and .png files under
// the directory public/models. They must have the same fileName.
const Model: React.FC<ModelProps> = ({ fileName, scale = 1 }) => {
  const materials = useLoader(MTLLoader, `/models/${fileName}.mtl`);
  const obj = useLoader(OBJLoader, `/models/${fileName}.obj`, (loader: any) => {
    materials.preload();
    loader.setMaterials(materials);
  });
  return <primitive object={obj} scale={scale} />;
};

export default MapComponent(Model);