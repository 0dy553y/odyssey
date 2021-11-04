import { Box, Typography } from '@mui/material';
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
  return (
    <Swiper
      centeredSlides
      slidesPerView={3.2}
      spaceBetween={20}
      onActiveIndexChange={handleActiveIndexChange}
      className={classes.carousel}
    >
      {Object.keys(Character)
        .filter((k) => Number.isNaN(+k))
        .map((c: string, index: number) => {
          return (
            <SwiperSlide key={c}>
              <Box>
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
