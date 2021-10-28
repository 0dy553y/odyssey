import React, { useEffect } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { Card, Switch, Stack, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { makeStyles } from '@mui/styles';
import { ChallengeMapData } from '../../types/challenges';
import SpaceMap from './SpaceMap';

const useStyles = makeStyles(() => ({
  mapSlider: {
    height: '100vh',
  },
  header: {
    color: 'white',
  },
  name: {
    position: 'absolute',
    zIndex: 10,
    marginLeft: 64,
    marginTop: 24,
  },
  map: {
    position: 'absolute',
    height: '100vh',
    width: '100vw',
  },
  container: {
    position: 'relative',
  },
}));

interface MapCarouselProps {
  maps: ChallengeMapData[];
}

const MapCarousel: React.FC<MapCarouselProps> = ({ maps }) => {
  const classes = useStyles();
  return (
    <Swiper
      centeredSlides
      loop={true}
      //   initialSlide={previousIndex}
      pagination={{
        dynamicBullets: true,
        clickable: true,
      }}
      navigation={true}
      slidesPerView={1}
      spaceBetween={20}
      className={classes.mapSlider}
    >
      {maps.map(({ id, name, numTasks, currentTask }) => (
        <SwiperSlide key={id}>
          <div className={classes.container}>
            <Stack className={classes.name}>
              <Typography variant="h1" className={classes.header}>
                {name}
              </Typography>
            </Stack>
            <div className={classes.map}>
              <SpaceMap numSteps={numTasks} currentStep={currentTask} />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MapCarousel;
