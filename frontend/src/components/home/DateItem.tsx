import React from 'react';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  handCursor: {
    cursor: 'pointer',
  },
}));

interface Props {
  date: Date;
}

const DateItem: React.FC<Props> = ({ date }: Props) => {
  const classes = useStyles();

  return (
    <Typography variant="h5" align="center" className={classes.handCursor}>
      {date.getDate()}
    </Typography>
  );
};

export default DateItem;
