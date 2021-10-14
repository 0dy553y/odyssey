import React from 'react';
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

interface ChallengeMilestonesProps {
  tasks: TaskListData[];
  userTasks: UserTaskListData[] | null;
}

const useStyles = makeStyles(() => ({
  opposite: { maxWidth: '1px', paddingLeft: '0px', paddingRight: '0px' },
  checkbox: { padding: '0px' },
}));

const ChallengeMilestones: React.FC<ChallengeMilestonesProps> = (props) => {
  const { tasks, userTasks } = props;
  const classes = useStyles();

  const completion: Record<number, boolean> = {};
  let earliestUncompletedIndex = -1;
  userTasks?.map((t: UserTaskListData) => {
    completion[t.id] = t.isCompleted;
    if (!t.isCompleted && earliestUncompletedIndex === -1) {
      earliestUncompletedIndex = t.id;
    }
  });
  console.log(earliestUncompletedIndex);

  return (
    <Box>
      <Timeline>
        {tasks.map((t: TaskListData, index: number) => (
          <TimelineItem key={t.id}>
            <TimelineOppositeContent className={classes.opposite} />
            <TimelineSeparator>
              <TimelineDot>
                {userTasks === null || !completion[t.id] ? (
                  // Unenrolled, or tasks in the future.
                  <Circle />
                ) : t.id === earliestUncompletedIndex ? (
                  // Earliest uncompleted task.
                  <Checkbox
                    icon={<RadioButtonUnchecked />}
                    checkedIcon={<CheckCircle />}
                    className={classes.checkbox}
                  />
                ) : (
                  // Have completed.
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
