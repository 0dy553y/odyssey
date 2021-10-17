import React from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  Stack,
  Theme,
  Typography,
} from '@mui/material';
import RecurringDaysForm from 'components/recurringDaysForm';
import { DayOfWeek } from 'types/date';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  scheduleModal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    padding: '0.6em',
    '&>:not(:last-child)': {
      marginBottom: '0.3em',
    },
  },
}));

const ScheduleModal: React.FC<ScheduleModalProps> = ({ isOpen, onClose }) => {
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
        <Box className={classes.scheduleModal}>
          <Typography component="div" variant="h6">
            Select recurring days
          </Typography>

          <RecurringDaysForm
            isEditable={true}
            schedule={{
              [DayOfWeek.Monday]: true,
              [DayOfWeek.Tuesday]: true,
              [DayOfWeek.Wednesday]: true,
              [DayOfWeek.Thursday]: true,
              [DayOfWeek.Friday]: true,
              [DayOfWeek.Saturday]: true,
              [DayOfWeek.Sunday]: true,
            }}
          />
          <Stack direction="row" justifyContent="flex-end" alignItems="center">
            <Button variant="contained">Join Challenge</Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ScheduleModal;
