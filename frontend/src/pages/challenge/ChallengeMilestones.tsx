import React from 'react';
import { Box, Checkbox, Typography } from '@mui/material';
import { CheckCircle, RadioButtonUnchecked, Circle } from '@mui/icons-material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import { TaskData, UserChallengeData } from '../../types/challenges';

interface ChallengeMilestonesProps {
  tasks: TaskData[];
  attempt: UserChallengeData | null;
}

const ChallengeMilestones: React.FC<ChallengeMilestonesProps> = (props) => {
  const { tasks, attempt } = props;

  return (
    <Box>
      <Timeline>
        {tasks.map((t: TaskData, index: number) => (
          <TimelineItem key={t.id}>
            <TimelineSeparator>
              <TimelineDot>
                {attempt === null ||
                t.id > attempt.last_completed_task_id + 1 ? (
                  // Unenrolled, or tasks in the future.
                  <Circle />
                ) : t.id === attempt.last_completed_task_id + 1 ? (
                  // Earliest uncompleted task.
                  <Checkbox
                    icon={<RadioButtonUnchecked />}
                    checkedIcon={<CheckCircle />}
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
              <Typography>
                Day {t.dayNumber}: {t.title}
              </Typography>
              <Typography>{t.description} </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
};

export default ChallengeMilestones;
