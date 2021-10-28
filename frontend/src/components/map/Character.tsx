import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { useLoader, Vector3 } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { useSpring, animated, config } from '@react-spring/three';
import { Direction } from '../../types/map';
import { getRotation } from '../../utils/direction';
import { DirectionPosition } from '../../types/map';

interface CharacterProps {
  position: Vector3;
  direction: Direction;
  username: string;
}

const Character = (props: CharacterProps, ref: React.Ref<unknown>) => {
  const { position, direction, username } = props;
  const materials = useLoader(MTLLoader, '/models/astronaut.mtl');
  const astronaut = useLoader(
    OBJLoader,
    '/models/astronaut.obj',
    (loader: any) => {
      materials.preload();
      loader.setMaterials(materials);
    }
  );
  const characterRef = useRef();
  const [flip, set] = useState(false);
  const { pos } = useSpring({
    from: { pos: position as number[] },
    reset: false,
    config: config.gentle,
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

  return (
    <animated.group
      ref={characterRef}
      position={pos as any as Vector3}
      rotation={[0, getRotation(direction), 0]}
    >
      <Html position={[1, 3, 0]}>
        <p style={{ color: 'white' }}>{username}</p>
      </Html>
      <animated.primitive
        position={localPos as any as Vector3}
        object={astronaut}
        scale={0.4}
      />
    </animated.group>
  );
};

export default forwardRef(Character);
