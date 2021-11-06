import React, { useEffect } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { loadAllOngoingChallengeMaps } from 'store/userchallenges/operations';
import { getOngoingChallengeMaps } from 'store/userchallenges/selectors';
import { useHistory, useParams } from 'react-router-dom';
import MapCarousel from '../../components/map/MapCarousel';
import { RootState } from 'store';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import { ReactComponent as BackArrow } from 'assets/icons/arrow-left.svg';
import { UserChallengeMapData } from 'types/userchallenge';
import { COMPLETED_MAP_ROUTE } from 'routing/routes';

const OngoingMapsPage: React.FC = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    batch(() => {
      dispatch(loadAllOngoingChallengeMaps());
    });
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const challengeMaps = useSelector((state: RootState) =>
    getOngoingChallengeMaps(state)
  )!;

  const challengeIdToSwiperIndexMap: Record<string, number> = {};
  challengeMaps.map((data: UserChallengeMapData, index: number) => {
    challengeIdToSwiperIndexMap[data.challengeId] = index;
  });

  // Re-route to completed map page.
  if (!(challengeId in challengeIdToSwiperIndexMap)) {
    history.replace(`${COMPLETED_MAP_ROUTE}/${challengeId}`);
  }

  return (
    <>
      <AppBar position="absolute" sx={{ right: 'auto' }}>
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
      <Box>
        <MapCarousel
          maps={challengeMaps}
          initialIndex={challengeIdToSwiperIndexMap[challengeId]}
        />
      </Box>
    </>
  );
};

export default OngoingMapsPage;
