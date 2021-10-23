import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';
import obebebe from '../../assets/gifs/obebebe.gif';

const useStyles = makeStyles(() => ({
  descriptionSegment: {
    position: 'relative',
    margin: '5em -40vw 1em -40vw',
    minWidth: '80vw',
    left: '50%',
    right: '50%',
    width: '80vw',
    overflow: 'hidden',
    verticalAlign: 'middle',
    textAlign: 'center',
  },
  sideDescription: {
    paddingTop: '5em',
    textAlign: 'center',
    display: 'inline-block',
  },
}));

const DescriptionSegment: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.descriptionSegment}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 5 }}
      >
        <Box>
          <img src={obebebe} />
        </Box>
        <Box className={classes.sideDescription}>
          <Typography variant="h4">
            Challenge yourself and your friends to reach your goals.
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default DescriptionSegment;
