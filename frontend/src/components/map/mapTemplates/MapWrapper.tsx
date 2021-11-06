/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  forwardRef,
  Suspense,
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
}

const MapWrapper = (props: MapWrapperProps, ref: React.Ref<unknown>) => {
  const { mapData } = props;
  const [isPrizeModalOpen, setIsPrizeModalOpen] = useState<boolean>(false);
  const mapRef = useRef();

  useImperativeHandle(ref, () => ({
    moveCharacterForward() {
      if (mapRef.current) {
        (mapRef.current as any).moveCharacterForward();
      }
    },
  }));

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

export default forwardRef(MapWrapper);
