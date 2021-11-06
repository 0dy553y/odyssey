import React, { useEffect } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { loadChallengeMap } from 'store/userchallenges/operations';
import { getChallengeMap } from 'store/userchallenges/selectors';
import { useHistory, useParams } from 'react-router-dom';
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
import { makeStyles } from '@mui/styles';
import MapWrapper from 'components/map/mapTemplates/MapWrapper';

const useStyles = makeStyles(() => ({
  header: {
    color: 'white',
  },
  name: {
    position: 'absolute',
    zIndex: 10,
    marginLeft: 96,
    marginTop: 24,
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

const CompletedMapPage: React.FC = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const history = useHistory();
  const dispatch = useDispatch();
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
      <Box sx={{ height: '100%' }}>
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
      </Box>
    </>
  );
};

export default CompletedMapPage;
