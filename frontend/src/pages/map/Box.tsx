import React, { useRef } from 'react';

export const Box = () => {
  // This reference will give us direct access to the THREE.Mesh object
  const ref = useRef();
  const size = 1.5;
  return (
    <mesh ref={ref}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={'yellow'} />
    </mesh>
  );
};
