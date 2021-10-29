/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Dialog, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ChallengeMapData } from 'types/challenges';
import SpaceMap from './mapTemplates/SpaceMap';

const useStyles = makeStyles(() => ({
  header: {
    color: 'white',
  },
  map: {
    position: 'absolute',
    height: '100vh',
    width: '100vw',
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
      console.log(node);
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
        <Typography variant="h1" className={classes.header}>
          {mapData.challengeName}
        </Typography>
        <div className={classes.map}>
          <SpaceMap mapData={mapData} ref={mapRef} />
        </div>
      </>
    </Dialog>
  );
};

export default MapDialog;
