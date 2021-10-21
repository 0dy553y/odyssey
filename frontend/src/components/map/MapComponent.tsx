import React from 'react';
import { Vector3 } from '@react-three/fiber';
import { Direction } from '../../types/map';
import { HexCode } from '../../types/color';
import { getRotation } from '../../utils/direction';

export interface Color {
  color: HexCode;
}

interface MapComponentProps {
  position: Vector3;
  direction?: Direction;
  colorOverride?: HexCode;
  [props: string]: unknown;
}

// Higher order component that can be used to wrap around any
// map component to provide position, direction and color.
export function MapComponent<Type>(WrappedComponent: React.FC<Type & Color>) {
  const buildBlock: React.FC<MapComponentProps> = ({
    position,
    direction = Direction.FORWARD,
    colorOverride,
    ...otherProps
  }: MapComponentProps) => {
    return (
      <group position={position} rotation={[0, getRotation(direction), 0]}>
        {/* TODO: Resolve type warning */}
        <WrappedComponent
          {...otherProps}
          color={colorOverride ? colorOverride : '#8690ff'}
        />
      </group>
    );
  };
  return buildBlock;
}
