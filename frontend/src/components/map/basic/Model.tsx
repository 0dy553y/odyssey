/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { MapComponent } from './MapComponent';
import { animated } from '@react-spring/three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { ModelFile, ModelFileFormat } from 'types/map';
interface ModelProps {
  modelFile: ModelFile;
  scale?: number;
}

// Loads a voxel model.
const Model: React.FC<ModelProps> = ({ modelFile, scale = 1 }) => {
  const { path, format } = modelFile;
  switch (format) {
    case ModelFileFormat.GLB:
      const gltf = useLoader(GLTFLoader, `/models/${path}.glb`);

      return <animated.primitive object={gltf.scene.clone()} scale={scale} />;
    // Default is OBJ
    default:
      const materials = useLoader(MTLLoader, `/models/${path}.mtl`);
      const obj = useLoader(OBJLoader, `/models/${path}.obj`, (loader: any) => {
        materials.preload();
        loader.setMaterials(materials);
      });
      return <animated.primitive object={obj.clone()} scale={scale} />;
  }
};

export default animated(MapComponent(Model));
