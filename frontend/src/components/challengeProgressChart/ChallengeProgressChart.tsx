import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { displayDate } from 'utils/formatting';

import './ChallengeProgressChart.scss';

interface ChallengeProgressChartProps {
  height: string | number;
  color?: string;
  data: ChallengeProgressData[];
  totalNumberOfTasks: number;
  challengeEnrolledDate: Date;
}

interface ChallengeProgressData {
  taskCompletionDate: Date;
  taskIndex: number;
}

interface ProgressChartDataPoint extends ChallengeProgressData {
  percentage: number;
  timestamp: number;
}

const getDataPoints = (
  data: ChallengeProgressData[],
  totalNumberOfTasks: number
): ProgressChartDataPoint[] => {
  return data.map((datum) => {
    return {
      ...datum,
      percentage: ((datum.taskIndex + 1) / totalNumberOfTasks) * 100,
      timestamp: datum.taskCompletionDate.getTime(),
    };
  });
};

const ChallengeProgressChart: React.FC<ChallengeProgressChartProps> = ({
  height,
  color,
  data,
  totalNumberOfTasks,
  challengeEnrolledDate,
}) => {
  const isChallengeCompleted = data.length === totalNumberOfTasks;

  const defaultStyles = {
    color: '#8884d8',
    maxOpacity: 0.8,
    minOpacity: 0,
    minOffset: '5%',
    maxOffset: '95%',
    areaDotStyles: {
      stroke: 'black',
      strokeWidth: 1,
    },
  };

  const gradientId = 'progress-chart-area-gradient';

  return (
    <ResponsiveContainer
      width="100%"
      height={height}
      className={'progress-chart-container'}
    >
      <AreaChart
        data={getDataPoints(data, totalNumberOfTasks)}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop
              offset={defaultStyles.minOffset}
              stopColor={color ?? defaultStyles.color}
              stopOpacity={defaultStyles.maxOpacity}
            />
            <stop
              offset={defaultStyles.maxOffset}
              stopColor={color ?? defaultStyles.color}
              stopOpacity={defaultStyles.minOpacity}
            />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="timestamp"
          tickFormatter={(timestamp) => displayDate(new Date(timestamp))}
          tick={false}
          type="number"
          domain={[
            challengeEnrolledDate.getTime(),
            (dataMax: Date) =>
              isChallengeCompleted ? dataMax : new Date().getTime(),
          ]}
        />
        <YAxis
          domain={[0, 100]}
          tickFormatter={(percent) => {
            if (percent === 0) {
              return `${percent}%`;
            }
            return percent;
          }}
        />
        <Tooltip
          formatter={(percentage: number) => {
            return [`${percentage.toFixed(1)}%`, 'Percentage'];
          }}
          labelFormatter={(timestamp: number) =>
            displayDate(new Date(timestamp))
          }
        />
        <Area
          type="monotone"
          dot={defaultStyles.areaDotStyles}
          dataKey="percentage"
          stroke={color ?? defaultStyles.color}
          fillOpacity={1}
          fill={`url(#${gradientId})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ChallengeProgressChart;
