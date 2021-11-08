import React from 'react';
import { Badge, Box, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  handCursor: {
    cursor: 'pointer',
  },
}));

interface Props {
  date: Date;
  shouldShowDot: boolean;
}

const DateItem: React.FC<Props> = ({ date, shouldShowDot }: Props) => {
  const classes = useStyles();

  return (
    <Stack alignItems="center">
      {shouldShowDot && (
        <Box sx={{ height: 0, transform: 'translate(0, -1.1em)' }}>
          <Badge color="warning" variant="dot" />
        </Box>
      )}
      <Typography variant="h5" align="center" className={classes.handCursor}>
        {date.getDate()}
      </Typography>
    </Stack>
  );
};

export default DateItem;
