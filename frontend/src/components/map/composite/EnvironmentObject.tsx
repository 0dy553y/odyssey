/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Vector3 } from '@react-three/fiber';
import { useSpring, animated, config } from '@react-spring/three';
import { Direction, ModelFile } from '../../../types/map';

import Model from '../basic/Model';
import { MapComponent } from '../basic/MapComponent';

interface EnvironmentObjectProps {
  modelFile: ModelFile;
  scale: number;
}

const EnvironmentObject: React.FC<EnvironmentObjectProps> = (
  props: EnvironmentObjectProps
) => {
  const { modelFile, scale } = props;

  // Idle hovering animation.
  const { localPos } = useSpring({
    loop: true,
    from: { localPos: [0, 0, 0] },
    to: [{ localPos: [0, 3, 0] }, { localPos: [0, 0, 0] }],
    config: { duration: 2500 },
  });

  return (
    <animated.group>
      <Model
        position={localPos as any as Vector3}
        direction={Direction.LEFT}
        modelFile={modelFile}
        scale={scale}
      />
    </animated.group>
  );
};

export default MapComponent(EnvironmentObject);
