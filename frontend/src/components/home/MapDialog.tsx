import React from 'react';
import { Dialog, Typography } from '@mui/material';
import { ChallengeMapData } from 'types/challenges';

interface MapDialogProps {
  isOpen: boolean;
  close: () => void;
  mapData: ChallengeMapData;
}

const MapDialog: React.FC<MapDialogProps> = ({ isOpen, close, mapData }) => {
  console.log(open);
  console.log(isOpen);
  return (
    <Dialog fullScreen open={isOpen} onClick={() => close()}>
      <Typography>{mapData.challengeName}</Typography>
    </Dialog>
  );
};

export default MapDialog;
