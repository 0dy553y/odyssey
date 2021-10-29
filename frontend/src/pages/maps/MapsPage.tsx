import React, { useState, useEffect } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { loadFriendsOnSameChallenges } from 'store/challenges/operations';
import { getChallengeMaps } from 'store/challenges/selectors';
import { useParams } from 'react-router-dom';
import MapCarousel from './MapCarousel';
import {
  ChallengeMapData,
  ChallengeFriendMapData,
} from '../../types/challenges';
import { RootState } from 'store';
import { default as Appbar } from '../../components/common/Appbar';

const MapsPage = () => {
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
  console.log(challengeId);
  console.log(challengeMaps);
  const [currentMap, setCurrentMap] = useState();
  return (
    <>
      <Appbar />
      <MapCarousel maps={challengeMaps} />
    </>
  );
};

export default MapsPage;
