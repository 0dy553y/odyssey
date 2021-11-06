import React from 'react';
import { Stack, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { makeStyles } from '@mui/styles';
import { UserChallengeMapData } from '../../types/userchallenge';
import SpaceMap from './mapTemplates/SpaceMap';
import './MapCarousel.scss';
import MapWrapper from './mapTemplates/MapWrapper';

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
    marginLeft: 96,
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
  maps: UserChallengeMapData[];
  initialIndex: number;
}

const MapCarousel: React.FC<MapCarouselProps> = ({ maps, initialIndex }) => {
  const classes = useStyles();

  return (
    <Swiper
      centeredSlides
      loop={maps.length > 1}
      initialSlide={initialIndex}
      navigation={maps.length > 1}
      slidesPerView={1}
      spaceBetween={20}
      allowTouchMove={false}
      noSwiping={true}
      noSwipingClass="swiper-slide"
      className={classes.mapSlider}
    >
      {maps.map((mapData: UserChallengeMapData) => (
        <SwiperSlide key={mapData.challengeId} className="swiper-slide">
          <div className={classes.container}>
            <Stack className={classes.name}>
              <Typography variant="h1" className={classes.header}>
                {mapData.challengeName}
              </Typography>
            </Stack>
            <div className={classes.map}>
              <MapWrapper mapData={mapData} />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MapCarousel;
