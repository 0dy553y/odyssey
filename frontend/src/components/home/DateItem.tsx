import React from 'react';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  container: {
    aspectRatio: '1',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  },
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
    <div className={classes.container}>
      <Typography variant="h5" align="center" className={classes.handCursor}>
        {date.getDate()}
      </Typography>
    </div>
  );
};

export default DateItem;
