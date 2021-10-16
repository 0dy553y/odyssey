import React from 'react';
import { Grid, Stack, Theme, Typography } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import CircularProgressWithLabel from 'components/common/circularProgressWithLabel';

import './ChallengeSummaries.scss';

export interface ChallengeSummaryProps {
  id: number;
  percentage: number;
  label: string;
  remarks: string;
}

interface ChallengeSummariesProps {
  challengeSummaries: ChallengeSummaryProps[];
}

const useStyles = makeStyles<Theme, ChallengeSummariesProps>((theme) =>
  createStyles({
    challengeSummary: {
      background: '#4068a3',
      borderRadius: '2em',
      padding: theme.spacing(3),
      marginBottom: theme.spacing(2),
      color: 'white',
    },
    challengeSummaryLabel: {
      fontWeight: theme.typography.fontWeightBold,
    },
  })
);

const ChallengeSummaries: React.FC<ChallengeSummariesProps> = (props) => {
  const { challengeSummaries } = props;

  const classes = useStyles(props);

  const ChallengeSummary = ({
    percentage,
    label,
    remarks,
  }: ChallengeSummaryProps) => (
    <Grid container className={classes.challengeSummary}>
      <Stack direction="row" spacing={5} alignItems="center">
        <CircularProgressWithLabel variant="determinate" value={percentage} />

        <Stack direction="column" spacing={1} alignItems="flex-start">
          <Typography
            component="div"
            variant="h6"
            className={classes.challengeSummaryLabel}
          >
            {label}
          </Typography>
          <Typography component="div" variant="body1">
            {remarks}hi
          </Typography>
        </Stack>
      </Stack>
    </Grid>
  );

  return (
    <Grid
      container
      direction="column"
      alignItems="flex-start"
      justifyContent="center"
    >
      <Grid item xs={12}>
        <Typography component="div" variant="h6" className="section-heading">
          Ongoing challenges
        </Typography>
      </Grid>
      {challengeSummaries.map((summary) => (
        <ChallengeSummary key={summary.id} {...summary} />
      ))}
    </Grid>
  );
};

export default ChallengeSummaries;
