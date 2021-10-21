import React from 'react';
import { MapComponent, Color } from './MapComponent';

interface ColumnsProps extends Color {
  columnWidth?: number;
  height?: number;
  width?: number;
}

const Columns: React.FC<ColumnsProps> = ({
  columnWidth = 0.15,
  height = 1,
  width = 1,
  color,
}) => {
  return (
    <group rotation={[0, -Math.PI / 2, 0]}>
      <mesh position={[-width / 2 + columnWidth / 2, height / 2 - 0.5, 0]}>
        <boxGeometry args={[columnWidth, height, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[width / 2 - columnWidth / 2, height / 2 - 0.5, 0]}>
        <boxGeometry args={[columnWidth, height, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};
export default MapComponent(Columns);
