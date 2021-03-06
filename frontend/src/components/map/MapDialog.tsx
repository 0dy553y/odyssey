/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { Dialog, Typography, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { UserChallengeMapData } from 'types/userchallenge';
import { batch, useDispatch } from 'react-redux';
import {
  loadAllOngoingChallengeMaps,
  loadChallengeMap,
} from 'store/userchallenges/operations';
import MapWrapper from './mapTemplates/MapWrapper';

const useStyles = makeStyles(() => ({
  header: {
    color: 'white',
    zIndex: 10,
  },
  map: {
    position: 'absolute',
    height: '100vh',
    width: '100vw',
  },
  name: {
    position: 'absolute',
    zIndex: 10,
    marginLeft: 64,
    marginTop: 24,
  },
}));

interface MapDialogProps {
  isOpen: boolean;
  close: () => void;
  mapData: UserChallengeMapData;
}

const MapDialog: React.FC<MapDialogProps> = ({ isOpen, close, mapData }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const isLastStep = mapData.currentTaskNum >= mapData.numTasks;

  const closeDialog = () => {
    batch(() => {
      dispatch(loadAllOngoingChallengeMaps());
      dispatch(loadChallengeMap(mapData.challengeId));
    });
    close();
  };

  useEffect(() => {
    if (isOpen && !isLastStep) {
      setTimeout(closeDialog, 4000);
    }
  }, [isOpen]);

  return (
    <Dialog fullScreen open={isOpen} onClick={closeDialog}>
      <>
        <Stack className={classes.name}>
          <Typography variant="h1" className={classes.header}>
            {mapData.challengeName}
          </Typography>
        </Stack>
        <div className={classes.map}>
          <MapWrapper mapData={mapData} shouldMoveCharacterForward={isOpen} />
        </div>
      </>
    </Dialog>
  );
};

export default MapDialog;
