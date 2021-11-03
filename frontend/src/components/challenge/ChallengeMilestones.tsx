import React from 'react';
import { useDispatch } from 'react-redux';
import { Box, Checkbox, Typography } from '@mui/material';
import {
  CheckRounded,
  RadioButtonUnchecked,
  Circle,
} from '@mui/icons-material';
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
  opposite: {
    maxWidth: '1px',
    paddingLeft: '0px',
    paddingRight: '0px',
  },
  checkbox: {
    padding: '9px',
  },
  overdue: {
    color: '#B57B7B',
  },
  future: {
    color: '#FFF',
  },
  today: {
    color: '#0a943f',
  },
  title: {
    fontWeight: 'bold',
  },
  displayLineBreak: {
    whiteSpace: 'pre-line',
  },
  timelineCircle: {
    boxShadow: 'none',
    height: '0.8em',
    width: '0.8em',
    padding: '0.2em',
  },
  checkRounded: {
    strokeWidth: 2,
    boxShadow: 'none',
    height: '0.8em',
    width: '0.8em',
    color: 'white',
  },
  wrapText: {
    wordBreak: 'break-word',
    hyphens: 'auto',
  },
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
    if (!isEnrolled) return <Circle className={classes.timelineCircle} />;

    if (isCompleted[taskId]) {
      return <CheckRounded className={classes.checkRounded} />;
    }

    const userTask = userTasks.find((userTask) => userTask.taskId == taskId);

    // Next task that is not in the future.
    if (isNextTask(taskId) && !isBefore(new Date(), scheduledFor[taskId])) {
      return (
        <Checkbox
          style={{
            strokeWidth: 2,
            boxShadow: 'none',
            height: '0.8em',
            width: '0.8em',
          }}
          icon={<RadioButtonUnchecked />}
          checkedIcon={<CheckRounded className={classes.checkRounded} />}
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
      return <Circle className={classes.timelineCircle} />;
    }
  };

  return (
    <Box sx={{ marginTop: '24px' }}>
      <Timeline>
        {tasks.map((t: TaskListData, index: number) => (
          <TimelineItem key={t.id}>
            <TimelineOppositeContent className={classes.opposite} />
            <TimelineSeparator>
              <TimelineDot
                sx={{ margin: '0em' }}
                color="secondary"
                className={getDotStyle(t.id)}
              >
                {renderCorrectIcon(t.id)}
              </TimelineDot>
              {index < tasks.length - 1 ? (
                <TimelineConnector
                  sx={{ backgroundColor: 'rgba(0, 0, 0, 0.07)' }}
                />
              ) : (
                // Don't show trailing line on last element.
                <div />
              )}
            </TimelineSeparator>
            <TimelineContent>
              <Typography className={classes.title}>{t.name}</Typography>
              <Typography
                className={`${classes.displayLineBreak} ${classes.wrapText}`}
              >
                {t.description}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
};

export default ChallengeMilestones;
