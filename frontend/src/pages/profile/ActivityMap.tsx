import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import CalendarHeatmap from 'react-calendar-heatmap';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { displayDateRange } from 'utils/formatting';
import { subDays } from 'date-fns';

import './ActivityMap.css';

interface HeatmapData {
  date: Date;
  count: number;
}

const ActivityMap: React.FC = () => {
  // Show duration spanning 7 weekdays * 4 weeks * 4 months
  const numCellsToShow = 7 * 4 * 4;

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

  const startDate: Date = subDays(new Date(), numCellsToShow);
  const endDate: Date = new Date();

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
