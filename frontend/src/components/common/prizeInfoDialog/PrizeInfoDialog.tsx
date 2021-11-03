import React, { Suspense } from 'react';
import {
  Box,
  Dialog,
  Typography,
  DialogActions,
  IconButton,
  DialogContent,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/CloseRounded';
import { makeStyles } from '@mui/styles';
import { PrizeWithChallengeName } from '../../../pages/badge/BadgePage';
import PrizeModelDisplay from './PrizeModelDisplay';

const useStyles = makeStyles(() => ({
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

interface PrizeInfoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  prize: PrizeWithChallengeName;
}

const PrizeInfoDialog: React.FC<PrizeInfoDialogProps> = ({
  isOpen,
  onClose,
  prize,
}) => {
  const classes = useStyles();
  return (
    <Suspense fallback={<div />}>
      <Dialog
        open={isOpen}
        onClose={onClose}
        PaperProps={{
          style: { borderRadius: '1.5em', padding: '1em' },
        }}
      >
        <DialogActions
          sx={{
            marginBottom: '-3em',
            marginTop: '-0.5em',
          }}
        >
          <IconButton onClick={onClose}>
            <CloseIcon width="1.5em" />
          </IconButton>
        </DialogActions>
        <DialogContent>
          <Box sx={{ marginTop: '1em', height: '50%' }}>
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
        </DialogContent>
      </Dialog>
    </Suspense>
  );
};

export default PrizeInfoDialog;
