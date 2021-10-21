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
  onChallengeCompleted: (completedChallengeName: string) => void;
}

const useStyles = makeStyles(() => ({
  opposite: { maxWidth: '1px', paddingLeft: '0px', paddingRight: '0px' },
  checkbox: { padding: '0px' },
  overdue: { color: '#d1476a' },
  future: { color: '#4b55e3' },
  today: { color: '#0a943f' },
}));

const ChallengeMilestones: React.FC<ChallengeMilestonesProps> = (props) => {
  const { tasks, userTasks, onChallengeCompleted } = props;

  const dispatch = useDispatch();
  const classes = useStyles();

  const isCompleted: Record<number, boolean> = {};
  const scheduledFor: Record<number, Date> = {};
  let earliestUncompletedTaskId = Number.MAX_SAFE_INTEGER;
  userTasks?.map((t: UserTaskListData) => {
    isCompleted[t.taskId] = !!t.completedAt;
    if (!t.completedAt) {
      // User tasks array does not necessarily come back in order.
      earliestUncompletedTaskId = Math.min(t.taskId, earliestUncompletedTaskId);
    }

    scheduledFor[t.taskId] = t.scheduledFor;
  });

  const isNextTask = (taskId: number): boolean =>
    taskId === earliestUncompletedTaskId;
  const isEnrolled = userTasks && userTasks.length > 0;

  const getDotStyle = (taskId: number) => {
    // Unerolled, don't change style.
    if (!isEnrolled) return;

    // Don't change style for completed tasks.
    if (isCompleted[taskId]) return;

    if (isToday(scheduledFor[taskId])) {
      return classes.today;
    } else if (isBefore(scheduledFor[taskId], new Date())) {
      return classes.overdue;
    } else {
      return classes.future;
    }
  };

  const renderCorrectIcon = (taskId: number) => {
    if (!isEnrolled) return <Circle />;

    if (isCompleted[taskId]) {
      return <CheckCircle />;
    }

    const userTask = userTasks.find((userTask) => userTask.taskId == taskId);

    // Next task that is not in the future.
    if (isNextTask(taskId) && !isBefore(new Date(), scheduledFor[taskId])) {
      return (
        <Checkbox
          icon={<RadioButtonUnchecked />}
          checkedIcon={<CheckCircle />}
          onChange={() => {
            if (!userTask) {
              throw new Error('No matching user task found for task');
            }
            dispatch(
              markUserTaskAsDoneFromChallenge(userTask.id, onChallengeCompleted)
            );
          }}
          className={classes.checkbox}
        />
      );
    } else {
      return <Circle />;
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
                {renderCorrectIcon(t.id)}
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
