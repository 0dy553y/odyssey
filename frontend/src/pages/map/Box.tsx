import React, { useRef } from 'react';

export const Box = () => {
  // This reference will give us direct access to the THREE.Mesh object
  const ref = useRef();
  const size = 1;
  // 45 degrees in radians
  const rotRad = 0.785398;
  return (
    <mesh ref={ref} rotation={[rotRad, rotRad, 0]}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={'#d6e2cc'} />
    </mesh>
  );
};
