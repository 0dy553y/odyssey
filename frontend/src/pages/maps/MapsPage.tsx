import React, { useEffect } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { loadFriendsOnSameChallenges } from 'store/challenges/operations';
import { getChallengeMaps } from 'store/challenges/selectors';
import { useHistory, useParams } from 'react-router-dom';
import MapCarousel from '../../components/map/MapCarousel';
import { RootState } from 'store';
import { AppBar, IconButton, Toolbar } from '@mui/material';
import { ReactComponent as BackArrow } from 'assets/icons/arrow-left.svg';
import { ChallengeMapData } from 'types/challenges';

const MapsPage: React.FC = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const history = useHistory();
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
      <AppBar position="absolute">
        <Toolbar>
          <div
            onClick={() => {
              history.goBack();
            }}
          >
            <IconButton edge="start" sx={{ color: 'white', padding: '1em' }}>
              <BackArrow height="1.5em" width="1.5em" />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <MapCarousel
        maps={challengeMaps}
        initialIndex={challengeIdToSwiperIndexMap[challengeId]}
      />
    </>
  );
};

export default MapsPage;
