import { Avatar } from '@mui/material';
import React from 'react';
import { getPrizePath } from 'utils/prizes';

interface MapDialIconProps {
  prizeName: string;
}

const MapDialIcon: React.FC<MapDialIconProps> = ({ prizeName }) => {
  const prizePath = getPrizePath(prizeName).slice(7);
  /* eslint-disable */
  const iconImage = require(`../../assets/images/icons/${prizePath}.png`);
  return (
    <Avatar src={iconImage.default} sx={{ width: '1.5em', height: '1.5em' }} />
  );
};

export default MapDialIcon;
