import React from 'react';
import * as THREE from 'three';
import { MapComponent, Color } from './MapComponent';

interface ArchProps extends Color {
  columnWidth?: number;
  width?: number;
  height?: number;
}

const Arch: React.FC<ArchProps> = ({
  columnWidth = 0.15,
  width = 1,
  height = 1,
  color,
}) => {
  const archShape = new THREE.Shape();

  // Prevent z fighting.
  const offset = 0.001;

  const left = -width / 2 + offset;
  const right = width / 2 - offset;
  const up = height / 2 - offset;
  const down = -height / 2 + offset;

  archShape.moveTo(left + columnWidth, down);
  archShape.bezierCurveTo(
    left + columnWidth,
    up,
    right - columnWidth,
    up,
    right - columnWidth,
    down
  );
  archShape.lineTo(right, down);
  archShape.lineTo(right, up);
  archShape.lineTo(left, up);
  archShape.lineTo(left, down);
  return (
    <mesh rotation={[0, -Math.PI / 2, 0]} position={[0.5, 0, -0.5]}>
      <extrudeGeometry args={[archShape, { depth: 1, bevelEnabled: false }]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};
export default MapComponent(Arch);
