/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { buildRepeated } from '../../../utils/map';
import { Direction } from '../../../types/map';
import { MapComponent, Color } from '../basic/MapComponent';
import Box from '../basic/Box';
import Ladder from '../basic/Ladder';
import { Vector3 } from '@react-three/fiber';
import { useSpring, animated, config } from '@react-spring/three';

interface IslandProps {
  ladderHeight?: number;
}
const Island: React.FC<IslandProps & Color> = ({ ladderHeight = 1 }) => {
  const [flip, set] = useState(false);
  const { pos } = useSpring({
    reset: true,
    reverse: flip,
    from: { pos: [0, 0, 0] as Vector3 },
    pos: [0, 0.5, 0] as Vector3,
    delay: 200,
    config: config.molasses,
    onRest: () => set(!flip),
  });
  return (
    <animated.group position={pos as any as Vector3}>
      {buildRepeated({
        buildBlock: (keyBlock: number, position: Vector3) => (
          <group key={keyBlock}>
            {buildRepeated({
              buildBlock: (key: number, position: Vector3) => (
                <Box key={key} position={position} />
              ),
              base: position,
              height: 2,
              width: 3,
              repeatDirection: Direction.RIGHT,
            })}
          </group>
        ),
        base: [0, -2, 0],
        height: 1,
        width: 3,
        repeatDirection: Direction.FORWARD,
      })}
      {buildRepeated({
        buildBlock: (key: number, position: Vector3) => (
          <Ladder
            key={key + 100}
            position={position}
            direction={Direction.RIGHT}
          />
        ),
        base: [-1, 0, 0],
        height: ladderHeight,
        repeatDirection: Direction.FORWARD,
      })}
    </animated.group>
  );
};

export default MapComponent(Island);
