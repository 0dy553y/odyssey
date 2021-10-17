import React from 'react';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  container: {
    textAlign: 'center',
  },
}));

interface Props {
  date: Date;
}

const DateItem: React.FC<Props> = ({ date }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography>{date.getDate()}</Typography>
    </div>
  );
};

export default DateItem;
