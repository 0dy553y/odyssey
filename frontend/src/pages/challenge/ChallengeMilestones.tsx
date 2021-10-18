import React from 'react';
import { useDispatch } from 'react-redux';
import { Box, Checkbox, Typography } from '@mui/material';
import { CheckCircle, RadioButtonUnchecked, Circle } from '@mui/icons-material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineDot,
} from '@mui/lab';
import { makeStyles } from '@mui/styles';
import { TaskListData } from '../../types/tasks';
import { UserTaskListData } from '../../types/usertasks';
import { markUserTaskAsDoneFromChallenge } from '../../store/usertasks/operations';
import { isBefore, isToday } from 'date-fns';

interface ChallengeMilestonesProps {
  tasks: TaskListData[];
  userTasks: UserTaskListData[] | null;
}

const useStyles = makeStyles(() => ({
  opposite: { maxWidth: '1px', paddingLeft: '0px', paddingRight: '0px' },
  checkbox: { padding: '0px' },
  overdue: { color: '#d1476a' },
  future: { color: '#4b55e3' },
  today: { color: '#0a943f' },
}));

const ChallengeMilestones: React.FC<ChallengeMilestonesProps> = (props) => {
  const { tasks, userTasks } = props;
  const dispatch = useDispatch();
  const classes = useStyles();

  const completion: Record<number, boolean> = {};
  const scheduledFor: Record<number, Date> = {};
  let earliestUncompletedIndex = -1;
  userTasks?.map((t: UserTaskListData) => {
    completion[t.id] = !!t.completedAt;
    if (!t.completedAt && earliestUncompletedIndex === -1) {
      earliestUncompletedIndex = t.id;
    }

    scheduledFor[t.id] = new Date(t.scheduledFor);
  });

  console.log(userTasks);

  const isNextTask = (id: number): boolean => id === earliestUncompletedIndex;
  const isEnrolled = userTasks && userTasks.length > 0;

  const getDotStyle = (id: number) => {
    // Unerolled, don't change style.
    if (!isEnrolled) return;

    // Don't change style for completed tasks.
    if (completion[id]) return;

    if (isToday(scheduledFor[id])) {
      return classes.today;
    } else if (isBefore(scheduledFor[id], new Date())) {
      return classes.overdue;
    } else {
      return classes.future;
    }
  };

  return (
    <Box sx={{ marginTop: '24px' }}>
      <Timeline>
        {tasks.map((t: TaskListData, index: number) => (
          <TimelineItem key={t.id}>
            <TimelineOppositeContent className={classes.opposite} />
            <TimelineSeparator>
              <TimelineDot className={getDotStyle(t.id)}>
                {!isEnrolled || (!completion[t.id] && !isNextTask(t.id)) ? (
                  // Unenrolled, or tasks in the future.
                  <Circle />
                ) : isNextTask(t.id) &&
                  isBefore(scheduledFor[t.id], new Date()) ? (
                  // Earliest uncompleted task.
                  <Checkbox
                    icon={<RadioButtonUnchecked />}
                    checkedIcon={<CheckCircle />}
                    onChange={() =>
                      dispatch(markUserTaskAsDoneFromChallenge(t.id))
                    }
                    className={classes.checkbox}
                  />
                ) : (
                  // Have completed. Shows a tick.
                  <CheckCircle />
                )}
              </TimelineDot>
              {index < tasks.length - 1 ? (
                <TimelineConnector />
              ) : (
                // Don't show trailing line on last element.
                <div />
              )}
            </TimelineSeparator>
            <TimelineContent>
              <Typography>{t.name}</Typography>
              <Typography>{t.description} </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
};

export default ChallengeMilestones;
