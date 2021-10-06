import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Box } from './Box';

function Map() {
  const size = 1.5;
  const base = [0, -8, 0];
  const currentBox = base.slice();
  const numBoxes = 7;
  // 4 boxes per side
  const width = 4;
  let direction = 1;
  const pos = [];

  for (let i = 0; i < numBoxes; i++) {
    pos.push(currentBox.slice());
    if (i % width === 0) {
      direction *= -1;
    }
    currentBox[0] += direction * ((size * 1.5) / 2);
    currentBox[1] += size + 0.4;
  }

  return (
    <Canvas camera={{ zoom: 25 }} orthographic={true}>
      <color attach="background" args={['#3B9494']} />
      <directionalLight castShadow position={[0, 10, 0]} intensity={1.5} />
      <pointLight position={[-10, 0, 10]} intensity={0.8} />
      <pointLight position={[10, 0, 10]} intensity={0.5} />
      {pos.map((p, index) => {
        return <Box key={index} />;
      })}
      <OrbitControls
        addEventListener={undefined}
        hasEventListener={undefined}
        removeEventListener={undefined}
        dispatchEvent={undefined}
      />
    </Canvas>
  );
}

export default Map;
