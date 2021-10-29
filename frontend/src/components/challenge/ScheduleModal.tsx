import React, { useState } from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import {
  Backdrop,
  Box,
  Button,
  Fade,
  IconButton,
  Modal,
  Stack,
  Theme,
  Tooltip,
  Typography,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import RecurringDaysForm from 'components/recurringDaysForm';
import { Schedule } from 'types/challenges';
import { DayOfWeek } from 'types/date';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (schedule: Schedule) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  scheduleModal: {
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
    [theme.breakpoints.up('sm')]: {
      width: '400px',
    },
  },
  header: {
    verticalAlign: 'middle',
    display: 'inline-flex',
  },
}));

const ScheduleModal: React.FC<ScheduleModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [schedule, setSchedule] = useState<Schedule>({
    [DayOfWeek.Monday]: false,
    [DayOfWeek.Tuesday]: false,
    [DayOfWeek.Wednesday]: false,
    [DayOfWeek.Thursday]: false,
    [DayOfWeek.Friday]: false,
    [DayOfWeek.Saturday]: false,
    [DayOfWeek.Sunday]: false,
  });

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
          <Typography component="div" variant="h6" className={classes.header}>
            Select recurring days
            <Tooltip
              arrow
              title={
                'Recurring days are the days of the week in which you are able to commit to completing a task.'
              }
              leaveTouchDelay={3000}
              enterTouchDelay={50}
            >
              <IconButton size="small">
                <InfoOutlinedIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </Typography>

          <Typography component="div" variant="body2">
            Once confirmed, you cannot change the recurring days.
          </Typography>

          <RecurringDaysForm
            isEditable={true}
            initialSchedule={schedule}
            onCheckboxChange={(day: DayOfWeek, isChecked: boolean) =>
              setSchedule({
                ...schedule,
                [day]: isChecked,
              })
            }
          />

          <Stack direction="row" justifyContent="flex-end" alignItems="center">
            <Button variant="contained" onClick={() => onSubmit(schedule)}>
              Join Challenge
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ScheduleModal;
