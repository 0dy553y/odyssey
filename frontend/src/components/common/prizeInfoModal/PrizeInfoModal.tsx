import React, { Suspense } from 'react';
import { Box, Modal, Typography, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { PrizeWithChallengeName } from '../../../pages/badge/BadgePage';
import PrizeModelDisplay from './PrizeModelDisplay';

const useStyles = makeStyles((theme: Theme) => ({
  modalBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: theme.palette.background.paper,
    padding: '1em',
    height: '20em',
    [theme.breakpoints.only('xs')]: {
      width: '80vw',
    },
    [theme.breakpoints.up('sm')]: {
      width: '400px',
    },
    borderRadius: '24px',
  },
  header: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: 'gray',
    fontSize: '0.9em',
  },
  description: {
    textAlign: 'center',
    paddingTop: '0.4em',
  },
}));

interface PrizeInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  prize: PrizeWithChallengeName;
}

const PrizeInfoModal: React.FC<PrizeInfoModalProps> = ({
  isOpen,
  onClose,
  prize,
}) => {
  const classes = useStyles();
  return (
    <Suspense fallback={<div />}>
      <Modal open={isOpen} onClose={onClose}>
        <Box className={classes.modalBox}>
          <Box sx={{ marginTop: '2em', height: '50%' }}>
            <PrizeModelDisplay prizePath={prize.prizePath} />
          </Box>
          <Typography variant="h5" className={classes.header}>
            {prize.prizeName}
          </Typography>
          <Typography variant="body1" className={classes.subtitle}>
            {prize.prizeDescription}
          </Typography>
          <Typography className={classes.description}>
            Awarded for completing the {prize.challengeName} challenge
          </Typography>
        </Box>
      </Modal>
    </Suspense>
  );
};

export default PrizeInfoModal;
