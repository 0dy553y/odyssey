/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Vector3 } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useSpring, animated, config } from '@react-spring/three';
import { Direction } from '../../../types/map';
import { getRotation } from '../../../utils/direction';
import { DirectionPosition } from '../../../types/map';
import Model from '../basic/Model';

interface CharacterProps {
  position: Vector3;
  direction: Direction;
  username: string;
}

const Character = (props: CharacterProps, ref: React.Ref<unknown>) => {
  const { position, direction, username } = props;

  const characterRef = useRef();
  const [flip, set] = useState(false);
  const { pos } = useSpring({
    from: { pos: position as number[] },
    reset: false,
    config: { ...config.gentle, duration: 800 },
  });

  // Idle hovering animation.
  const { localPos } = useSpring({
    reset: true,
    from: { localPos: [0, 0.2, 0] },
    reverse: flip,
    localPos: [0, 1, 0],
    delay: 200,
    config: { ...config.slow, duration: 800 },
    onRest: () => set(!flip),
  });

  useImperativeHandle(ref, () => ({
    moveCharacter: (
      oldDirectionPosition: DirectionPosition,
      newDirectionPosition: DirectionPosition
    ) => {
      pos.start({
        from: oldDirectionPosition.pos as number[],
        to: newDirectionPosition.pos as number[],
      });
      if (characterRef.current !== undefined) {
        (characterRef.current as any).rotation.y = getRotation(
          newDirectionPosition.direction
        );
      }
    },
  }));

  return (
    <animated.group
      ref={characterRef}
      position={pos as any as Vector3}
      rotation={[0, getRotation(direction), 0]}
    >
      <Html position={[1.5, 3, 0]}>
        <p style={{ color: 'white' }}>{username}</p>
      </Html>
      <Model
        position={localPos as any as Vector3}
        direction={Direction.LEFT}
        fileName={'astronaut'}
        scale={0.8}
      />
    </animated.group>
  );
};

export default forwardRef(Character);
