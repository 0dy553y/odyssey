import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperClass from 'swiper/types/swiper-class';

import { Character } from 'types/map';
import CharacterDisplay from './CharacterDisplay';

const useStyles = makeStyles(() => ({
  carousel: {
    marginTop: '2em',
  },
}));

const CharacterCarousel: React.FC = () => {
  const classes = useStyles();
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(
    Character.ASTRONAUT
  );

  const handleActiveIndexChange = (swiper: SwiperClass) => {
    setSelectedCharacter(swiper.activeIndex as Character);
  };
  const handleClick = (swiper: SwiperClass) => {
    if (swiper.clickedIndex !== undefined) {
      swiper.slideTo(swiper.clickedIndex);
      setSelectedCharacter(swiper.clickedIndex);
    }
  };
  return (
    <Swiper
      centeredSlides
      spaceBetween={20}
      initialSlide={selectedCharacter}
      slidesPerView={3}
      breakpoints={{
        '180': {
          slidesPerView: 3,
        },
        '500': {
          slidesPerView: 5,
        },
      }}
      grabCursor={true}
      onActiveIndexChange={handleActiveIndexChange}
      className={classes.carousel}
      onClick={handleClick}
    >
      {Object.keys(Character)
        .filter((k) => Number.isNaN(+k))
        .map((c: string, index: number) => {
          return (
            <SwiperSlide key={c}>
              <Box sx={{ height: '15em' }}>
                <CharacterDisplay
                  character={c}
                  isActive={index === selectedCharacter}
                />
              </Box>
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};

export default CharacterCarousel;
