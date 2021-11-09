import React, { useEffect } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import {
  loadAllOngoingChallengeMaps,
  loadChallengeMap,
} from 'store/userchallenges/operations';
import {
  getChallengeMap,
  getOngoingChallengeMaps,
} from 'store/userchallenges/selectors';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

import { RootState } from 'store';
import {
  AppBar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { ReactComponent as BackArrow } from 'assets/icons/arrow-left.svg';
import { UserChallengeMapData } from 'types/userchallenge';
import { useIsDesktop } from 'utils/windowSize';
import MapWrapper from 'components/map/mapTemplates/MapWrapper';
import MapSpeedDial from 'components/map/MapSpeedDial';

const useStyles = makeStyles(() => ({
  mapSlider: {
    height: '100vh',
  },
  header: {
    color: 'white',
  },
  name: {
    position: 'absolute',
    zIndex: 10,
    marginLeft: 96,
    marginTop: 22,
  },
  map: {
    position: 'absolute',
    height: '100vh',
    width: '100%',
  },
  container: {
    position: 'relative',
  },
}));

const OngoingMapsPage: React.FC = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const history = useHistory();
  const dispatch = useDispatch();
  const isDesktop = useIsDesktop();
  const classes = useStyles();
  useEffect(() => {
    batch(() => {
      dispatch(loadChallengeMap(Number(challengeId)));
    });
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const mapData = useSelector((state: RootState) =>
    getChallengeMap(state, Number(challengeId))
  )!;

  return (
    <>
      <AppBar
        position="absolute"
        sx={isDesktop ? { right: 'auto', width: '20vw' } : {}}
      >
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
      <Box
        sx={
          isDesktop
            ? {}
            : {
                position: 'relative',
                margin: '0 -50vw 0 -50vw',
                left: '50%',
                right: '50%',
                width: '100vw',
              }
        }
      >
        {mapData ? (
          <div className={classes.container}>
            <Stack className={classes.name}>
              <Typography variant="h1" className={classes.header}>
                {mapData.challengeName}
              </Typography>
            </Stack>
            <div className={classes.map}>
              <MapWrapper mapData={mapData} />
            </div>
          </div>
        ) : (
          <></>
        )}
      </Box>
      <MapSpeedDial />
    </>
  );
};

export default OngoingMapsPage;
