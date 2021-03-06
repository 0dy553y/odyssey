import React from 'react';
import { Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import './OnboardingPage.scss';

const useStyles = makeStyles((theme: Theme) => ({
  onboardingImage: {
    filter: 'invert(1)',
    height: '45vh',
    [theme.breakpoints.down('sm')]: {
      maxHeight: '40vh',
    },
    marginBottom: '1em',
  },
  description: {
    display: 'inline-block',
    color: 'white',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '70vw',
      fontSize: '1em',
    },
  },
}));

interface OnboardingSlideProps {
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  imgUrl: any;
  color: string;
}

const OnboardingSlide: React.FC<OnboardingSlideProps> = (props) => {
  const { description, imgUrl, color } = props;
  const classes = useStyles();

  return (
    <>
      <div
        style={{
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
          background: color,
        }}
      >
        <div
          style={{
            transform: 'translateY(25%)',
          }}
        >
          <img src={imgUrl.default} className={classes.onboardingImage} />
          <br />
          <Typography variant="h5" className={classes.description}>
            {description}
          </Typography>
        </div>
      </div>
    </>
  );
};

export default OnboardingSlide;
