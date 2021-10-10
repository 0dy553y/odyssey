import React, { useState } from 'react';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import CalendarHeatmap from 'react-calendar-heatmap';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { displayDateRange } from 'utils/formatting';
import {
  addMonths,
  getDay,
  isBefore,
  isSameDay,
  lastDayOfMonth,
  min,
  subDays,
  subMonths,
} from 'date-fns';
import { createStyles, makeStyles } from '@mui/styles';

import './ActivityMap.scss';

export interface ActivityMapDataPoint {
  date: Date;
  count: number;
}

interface ActivityMapProps {
  activityMapData: ActivityMapDataPoint[];
}

const NUM_MONTHS_TO_SHOW = 4;

// Returns the number of cells to show in the activity map such that
// the left edge of the activity map will be filled completely, while the
// right edge may be partially filed (depending on the day of the week) that endDate
// falls on
// Assumption: Sunday is the first day of the week (as displayed on the activity map).
const getNumCellsToShow = (endDate: Date): number => {
  // Show duration spanning 7 weekdays * 4 weeks * numMonths by default
  const numCellsToShow = 7 * 4 * NUM_MONTHS_TO_SHOW;

  // Add additional cells such that left edge is filled completely
  const additionalCells = (getDay(endDate) + 1) % 7;

  return numCellsToShow + additionalCells;
};

const useStyles = makeStyles(() =>
  createStyles({
    dateRangeLabelContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
);

const ActivityMap: React.FC<ActivityMapProps> = (props) => {
  const { activityMapData } = props;
  const classes = useStyles();

  const TODAY = new Date();

  const [endDate, setEndDate] = useState<Date>(TODAY);
  const numCellsToShow = getNumCellsToShow(endDate);
  const startDate: Date = subDays(endDate, numCellsToShow);

  const shouldAllowEndDateIncrement =
    !isSameDay(endDate, TODAY) && isBefore(endDate, TODAY);

  const getHeatmapCellClass = (
    data: ActivityMapDataPoint | undefined
  ): string => {
    if (!data || data.count === 0) {
      return 'color-empty';
    }
    // Based on classes in ActivityMap.css
    const colorScaleClassPrefix = 'color-scale';
    const numColors = 4;

    if (data.count < numColors) {
      return `${colorScaleClassPrefix}-${data.count}`;
    }

    return `${colorScaleClassPrefix}-${numColors}`;
  };

  const incrementEndDate = () => {
    const newEndDates = [
      lastDayOfMonth(addMonths(endDate, NUM_MONTHS_TO_SHOW)),
      TODAY,
    ];
    console.log(TODAY);
    setEndDate(min(newEndDates));
  };

  const decrementEndDate = () => {
    setEndDate(lastDayOfMonth(subMonths(endDate, NUM_MONTHS_TO_SHOW)));
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Typography component="span" variant="h6">
        Activity Map
      </Typography>

      <Box className={classes.dateRangeLabelContainer}>
        <IconButton onClick={() => decrementEndDate()}>
          <ChevronLeftIcon />
        </IconButton>

        <Typography component="span" variant="body1">
          {displayDateRange(startDate, endDate)}
        </Typography>

        <IconButton
          onClick={() => incrementEndDate()}
          disabled={!shouldAllowEndDateIncrement}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>

      <Grid item xs={12}>
        <CalendarHeatmap
          startDate={startDate}
          endDate={endDate}
          showMonthLabels={false}
          values={activityMapData}
          classForValue={(value) => getHeatmapCellClass(value)}
        />
      </Grid>
    </Grid>
  );
};

export default ActivityMap;
