/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from 'react';
import { Dialog, Typography, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ChallengeMapData } from 'types/challenges';
import SpaceMap from './mapTemplates/SpaceMap';

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
  mapData: ChallengeMapData;
}

const MapDialog: React.FC<MapDialogProps> = ({ isOpen, close, mapData }) => {
  const classes = useStyles();
  const mapRef = useCallback(
    (node) => {
      if (node !== null && isOpen) {
        // setTimeout(() => {
        //   node.moveCharacterForward();
        // }, 1000);
        node.moveCharacterForward();
      }
    },
    [isOpen]
  );

  return (
    <Dialog fullScreen open={isOpen} onClick={() => close()}>
      <>
        <Stack className={classes.name}>
          <Typography variant="h1" className={classes.header}>
            {mapData.challengeName}
          </Typography>
        </Stack>
        <div className={classes.map}>
          <SpaceMap mapData={mapData} ref={mapRef} />
        </div>
      </>
    </Dialog>
  );
};

export default MapDialog;
