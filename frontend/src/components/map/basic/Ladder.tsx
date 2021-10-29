import React from 'react';
import { MapComponent, Color } from './MapComponent';

const Ladder: React.FC<Color> = ({ color }) => {
  const numRungs = 5;
  const Rung = (props: { y: number }) => (
    <mesh position={[0, props.y, 0.52]}>
      <planeGeometry args={[0.8, 0.1]} />
      <meshBasicMaterial color={'#333333'} />
    </mesh>
  );

  return (
    <>
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color={color} />
      </mesh>
      {[...Array(numRungs)].map((_, indexRung) => (
        <Rung key={indexRung} y={indexRung / numRungs - 0.5} />
      ))}
    </>
  );
};
export default MapComponent(Ladder);
