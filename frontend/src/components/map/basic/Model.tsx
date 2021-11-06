/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { MapComponent } from './MapComponent';
import { animated } from '@react-spring/three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { ModelFileFormat } from 'types/map';
interface ModelProps {
  fileName: string;
  fileFormat?: ModelFileFormat;
  scale?: number;
}

// Loads a voxel model.
// To add a new model, add its .obj, .mtl, and .png files under
// the directory public/models. They must have the same fileName.
const Model: React.FC<ModelProps> = ({
  fileName,
  fileFormat = ModelFileFormat.OBJ,
  scale = 1,
}) => {
  switch (fileFormat) {
    case ModelFileFormat.GLB:
      const gltf = useLoader(GLTFLoader, `/models/${fileName}.glb`);

      return <animated.primitive object={gltf.scene.clone()} scale={scale} />;
    // Default is OBJ
    default:
      const materials = useLoader(MTLLoader, `/models/${fileName}.mtl`);
      const obj = useLoader(
        OBJLoader,
        `/models/${fileName}.obj`,
        (loader: any) => {
          materials.preload();
          loader.setMaterials(materials);
        }
      );
      return <animated.primitive object={obj.clone()} scale={scale} />;
  }
};

export default animated(MapComponent(Model));
