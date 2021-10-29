import React, { useEffect } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { loadFriendsOnSameChallenges } from 'store/challenges/operations';
import { getChallengeMaps } from 'store/challenges/selectors';
// import { useParams } from 'react-router-dom';
import MapCarousel from '../../components/map/MapCarousel';
import { RootState } from 'store';
import { default as Appbar } from '../../components/common/Appbar';

const MapsPage: React.FC = () => {
  // const { challengeId } = useParams<{ challengeId: string }>();
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

  return (
    <>
      <Appbar />
      <MapCarousel maps={challengeMaps} />
    </>
  );
};

export default MapsPage;
