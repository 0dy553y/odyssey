import React, { useState, useEffect } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { loadAllOngoingUserChallenges } from 'store/userchallenges/operations';
import { useParams } from 'react-router-dom';
import MapCarousel from './MapCarousel';
import {
  ChallengeMapData,
  ChallengeFriendMapData,
} from '../../types/challenges';
import { default as Appbar } from '../../components/common/Appbar';

const mockData: ChallengeMapData[] = [
  {
    id: 1,
    name: 'Walking',
    numTasks: 3,
    currentTask: 1,
    friendsProgress: [
      {
        id: 1,
        username: 'Torchic',
        displayName: 'Torchic',
        currentTask: 1,
      },
      {
        id: 2,
        username: 'Mudkip',
        displayName: 'Mudkip',
        currentTask: 2,
      },
    ],
  },
  {
    id: 2,
    name: 'Gratitude Journalling',
    numTasks: 3,
    currentTask: 1,
    friendsProgress: [],
  },
];

const MapsPage = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const dispatch = useDispatch();
  // useEffect(() => {
  //   batch(() => {
  //     dispatch(loadAllOngoingUserChallenges());
  //   });
  // }, []);
  console.log(challengeId);
  const [currentMap, setCurrentMap] = useState();
  return (
    <>
      <Appbar />
      <MapCarousel maps={mockData} />
    </>
  );
};

export default MapsPage;
