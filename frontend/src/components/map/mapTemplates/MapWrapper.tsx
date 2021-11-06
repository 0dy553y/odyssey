/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  forwardRef,
  Suspense,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Canvas } from '@react-three/fiber';
import { UserChallengeMapData } from 'types/userchallenge';
import SpaceMap from './SpaceMap';
import PrizeInfoModal from 'components/common/prizeInfoDialog/PrizeInfoDialog';
import { getPrize } from 'utils/prizes';

interface MapWrapperProps {
  mapData: UserChallengeMapData;
  shouldMoveCharacterForward?: boolean;
}

const MapWrapper: React.FC<MapWrapperProps> = ({
  mapData,
  shouldMoveCharacterForward,
}) => {
  const [isPrizeModalOpen, setIsPrizeModalOpen] = useState<boolean>(false);

  const mapRef = useCallback(
    (node) => {
      if (node !== null && shouldMoveCharacterForward) {
        node.moveCharacterForward();
      }
    },
    [shouldMoveCharacterForward]
  );

  return (
    <>
      <Suspense fallback={<div />}>
        <Canvas camera={{ zoom: 100 }} orthographic={true}>
          <color attach="background" args={['#010101']} />
          <directionalLight position={[0, 30, 0]} intensity={1} />
          <pointLight position={[30, 0, 0]} intensity={0.5} />
          <pointLight position={[-30, 0, 0]} intensity={0.5} />
          <pointLight position={[0, 0, 30]} intensity={0.2} />
          <pointLight position={[0, 0, -30]} intensity={0.2} />
          <SpaceMap
            mapData={mapData}
            setIsPrizeModalOpen={setIsPrizeModalOpen}
            ref={mapRef}
          />
        </Canvas>
      </Suspense>
      <PrizeInfoModal
        isOpen={isPrizeModalOpen}
        onClose={() => setIsPrizeModalOpen(false)}
        prize={{
          ...getPrize(mapData.prizeName, mapData.challengeName),
          challengeName: mapData.challengeName,
        }}
      />
    </>
  );
};

export default MapWrapper;
