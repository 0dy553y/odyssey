import React from 'react';
import { Typography } from '@mui/material';

interface Props {
  date: Date;
}

const DateItem: React.FC<Props> = ({ date }: Props) => {
  return <Typography>{date.getDate()}</Typography>;
};

export default DateItem;
