import React, { useEffect } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { loadFriendsOnSameChallenges } from 'store/challenges/operations';
import { getChallengeMaps } from 'store/challenges/selectors';
import { useParams } from 'react-router-dom';
import MapCarousel from '../../components/map/MapCarousel';
import { RootState } from 'store';
import { default as Appbar } from '../../components/common/Appbar';
import { ChallengeMapData } from 'types/challenges';

const MapsPage: React.FC = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const dispatch = useDispatch();
  useEffect(() => {
    batch(() => {
      dispatch(loadFriendsOnSameChallenges());
    });
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const challengeMaps = useSelector((state: RootState) =>
    getChallengeMaps(state)
  )!;

  const challengeIdToSwiperIndexMap: Record<string, number> = {};
  challengeMaps.map((data: ChallengeMapData, index: number) => {
    challengeIdToSwiperIndexMap[data.challengeId] = index;
  });

  return (
    <>
      <Appbar />
      <MapCarousel
        maps={challengeMaps}
        initialIndex={challengeIdToSwiperIndexMap[challengeId]}
      />
    </>
  );
};

export default MapsPage;
