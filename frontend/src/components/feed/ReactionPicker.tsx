import SentimentSatisfiedRoundedIcon from '@mui/icons-material/SentimentSatisfiedRounded';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import { Avatar, Badge, Box, Typography } from '@mui/material';
import { ReactionEmoji } from 'types/posts';
import { displayReactionEmoji } from 'utils/formatting';

import './ReactionPicker.scss';

interface ReactionPickerProps {
  onReactionSelect: (emoji: ReactionEmoji) => void;
}

export const ReactionPicker: React.FC<ReactionPickerProps> = ({
  onReactionSelect,
}) => {
  return (
    <Box className="reaction-picker">
      <Badge
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={<AddIcon className="add-icon" />}
      >
        <SentimentSatisfiedRoundedIcon className="smiley-icon" />
      </Badge>
    </Box>
  );
};
