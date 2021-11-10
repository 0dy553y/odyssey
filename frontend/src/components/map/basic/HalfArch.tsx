import React from 'react';
import * as THREE from 'three';
import { MapComponent, Color } from './MapComponent';

interface HalfArchProps extends Color {
  width?: number;
  height?: number;
}

const HalfArch: React.FC<HalfArchProps> = ({
  width = 1,
  height = 1,
  color,
}) => {
  const halfArchShape = new THREE.Shape();

  // Prevent z fighting.
  const offset = 0.001;

  const left = -width / 2 + offset;
  const right = -offset;
  const up = height / 2 - offset;
  const down = -height / 2 + offset;

  halfArchShape.moveTo(left, down);
  halfArchShape.bezierCurveTo(left, up, right, up, right, up);
  halfArchShape.lineTo(right, up);
  halfArchShape.lineTo(left, up);
  halfArchShape.lineTo(left, down);
  return (
    <mesh rotation={[0, -Math.PI / 2, 0]} position={[0.5, 0, -0.5]}>
      <extrudeGeometry
        args={[halfArchShape, { depth: 1, bevelEnabled: false }]}
      />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};
export default MapComponent(HalfArch);
