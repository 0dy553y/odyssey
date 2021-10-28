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
      loop={maps.length > 1}
      //   initialSlide={previousIndex}
      pagination={{
        dynamicBullets: true,
        clickable: maps.length > 1,
      }}
      navigation={true}
      slidesPerView={1}
      spaceBetween={20}
      className={classes.mapSlider}
    >
      {maps.map(
        ({
          username,
          challengeId,
          challengeName,
          numTasks,
          currentTaskNum,
          friends,
        }) => {
          const friendsPositions: Record<number, string[]> = {};

          friends.map(({ username, displayName, currentTaskNum }) => {
            if (!(currentTaskNum in friendsPositions)) {
              friendsPositions[currentTaskNum] = [];
            }
            friendsPositions[currentTaskNum].push(username);
          });
          return (
            <SwiperSlide key={challengeId}>
              <div className={classes.container}>
                <Stack className={classes.name}>
                  <Typography variant="h1" className={classes.header}>
                    {challengeName}
                  </Typography>
                </Stack>
                <div className={classes.map}>
                  <SpaceMap
                    username={username}
                    challengeName={challengeName}
                    numSteps={numTasks}
                    currentStep={currentTaskNum}
                    friendsPositions={friendsPositions}
                  />
                </div>
              </div>
            </SwiperSlide>
          );
        }
      )}
    </Swiper>
  );
};

export default MapCarousel;
