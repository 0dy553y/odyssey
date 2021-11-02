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
    padding: '2em 1.5em 1em 1.5em',
    '&>:not(:last-child)': {
      marginBottom: '0.3em',
    },
    [theme.breakpoints.only('xs')]: {
      width: '90vw',
    },
    [theme.breakpoints.up('sm')]: {
      width: '400px',
    },
    outline: 'none',
    borderRadius: '2em',
  },
  header: {
    verticalAlign: 'middle',
    display: 'inline-flex',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  recurringDaysForm: {
    paddingTop: '1em',
    overflow: 'scroll',
  },
  startChallengeButton: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
    borderRadius: '1em',
    color: 'white',
    padding: '0.8em 2em 0.8em 2em',
    marginTop: '1em',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
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
          <Typography component="div" variant="h3" className={classes.header}>
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

          <Typography component="div" variant="body1">
            Once confirmed, you cannot change the recurring days.
          </Typography>
          <div className={classes.recurringDaysForm}>
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
          </div>

          <Stack direction="row" justifyContent="center" alignItems="center">
            <Button
              className={classes.startChallengeButton}
              onClick={() => onSubmit(schedule)}
            >
              <Typography variant="h6">Let&apos;s go!</Typography>
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ScheduleModal;
