import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import CalendarHeatmap from 'react-calendar-heatmap';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { displayDateRange } from 'utils/formatting';
import { getDay, subDays } from 'date-fns';

import './ActivityMap.css';

interface HeatmapData {
  date: Date;
  count: number;
}

// Returns the number of cells to show in the activity map such that
// the left edge of the activity map will be filled completely, while the
// right edge may be partially filed (depending on the day of the week) that endDate
// falls on
// Assumption: Sunday is the first day of the week (as displayed on the activity map).
const getNumCellsToShow = (endDate: Date): number => {
  const numMonths = 4;

  // Show duration spanning 7 weekdays * 4 weeks * numMonths by default
  const numCellsToShow = 7 * 4 * numMonths;

  // Add additional cells such that left edge is filled completely
  const additionalCells = (getDay(endDate) + 1) % 7;

  return numCellsToShow + additionalCells;
};

const ActivityMap: React.FC = () => {
  const heatmapData = [
    { date: new Date('2021-10-02'), count: 6 },
    { date: new Date('2021-09-22'), count: 3 },
    { date: new Date('2021-09-30'), count: 2 },
    { date: new Date('2021-10-03'), count: 2 },
    { date: new Date('2021-10-01'), count: 1 },
    { date: new Date('2021-09-15'), count: 9 },
    { date: new Date('2021-09-14'), count: 2 },
    { date: new Date('2021-09-07'), count: 1 },
  ];

  const endDate: Date = new Date();
  const numCellsToShow = getNumCellsToShow(endDate);
  const startDate: Date = subDays(endDate, numCellsToShow);

  const getHeatmapCellClass = (data: HeatmapData | undefined): string => {
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

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Typography component="span" variant="h6">
        Activity Map
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ChevronLeftIcon />
        <Typography component="span" variant="h6">
          {displayDateRange(startDate, endDate)}
        </Typography>
        <ChevronRightIcon />
      </Box>

      <Grid item xs={12}>
        <CalendarHeatmap
          startDate={startDate}
          endDate={endDate}
          showMonthLabels={false}
          values={heatmapData}
          classForValue={(value) => getHeatmapCellClass(value)}
        />
      </Grid>
    </Grid>
  );
};

export default ActivityMap;
