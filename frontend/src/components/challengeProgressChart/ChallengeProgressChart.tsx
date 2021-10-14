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
}) => {
  const isChallengeCompleted = data.length === totalNumberOfTasks;

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
          <linearGradient
            id="progress-chart-area-gradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="5%"
              stopColor={color ?? '#8884d8'}
              stopOpacity={0.8}
            />
            <stop offset="95%" stopColor={color ?? '#8884d8'} stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="timestamp"
          tickFormatter={(timestamp) => displayDate(new Date(timestamp))}
          type="number"
          domain={[
            'dataMin',
            (dataMax: Date) => {
              console.log(isChallengeCompleted, dataMax);

              return isChallengeCompleted ? dataMax : new Date();
            },
          ]}
        />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="percentage"
          stroke={color ?? '#8884d8'}
          fillOpacity={1}
          fill="url(#progress-chart-area-gradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ChallengeProgressChart;
