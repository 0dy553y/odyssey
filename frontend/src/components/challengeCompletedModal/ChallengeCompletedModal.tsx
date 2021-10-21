import React from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import { Backdrop, Box, Fade, Modal, Theme, Typography } from '@mui/material';

interface ChallengeCompletedModalProps {
  challengeName: string;
  isOpen: boolean;
  onClose: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    padding: '0.6em',
    '&>:not(:last-child)': {
      marginBottom: '0.3em',
    },
    [theme.breakpoints.only('xs')]: {
      width: '90vw',
    },
    [theme.breakpoints.up('md')]: {
      width: '400px',
    },
  },
}));

const ChallengeCompletedModal: React.FC<ChallengeCompletedModalProps> = ({
  challengeName,
  isOpen,
  onClose,
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <Box className={classes.modal}>
          <Typography component="div" variant="h6">
            Congratulations on completing &apos;{challengeName}&apos;.
          </Typography>
          {/* TODO: add form to allow users to post directly to feed? */}
        </Box>
      </Fade>
    </Modal>
  );
};

export default ChallengeCompletedModal;
