import React, { useState, useRef } from 'react';
import SentimentSatisfiedRoundedIcon from '@mui/icons-material/SentimentSatisfiedRounded';
import AddIcon from '@mui/icons-material/Add';
import {
  Avatar,
  Badge,
  Box,
  ClickAwayListener,
  Fade,
  IconButton,
  Popper,
  Typography,
} from '@mui/material';
import { ReactionEmoji } from 'types/posts';
import { displayReactionEmoji } from 'utils/formatting';

import './ReactionPicker.scss';

interface ReactionPickerProps {
  onReactionSelect: (emoji: ReactionEmoji) => void;
}

export const ReactionPicker: React.FC<ReactionPickerProps> = ({
  onReactionSelect,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const buttonRef = useRef<null | HTMLButtonElement>(null);

  return (
    <Box component="span" className="reaction-picker">
      <IconButton onClick={() => setIsOpen(true)} ref={buttonRef}>
        <Badge
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={<AddIcon className="add-icon" />}
        >
          <SentimentSatisfiedRoundedIcon className="smiley-icon" />
        </Badge>
      </IconButton>

      <Popper open={isOpen} anchorEl={buttonRef.current} transition>
        {({ TransitionProps }) => (
          <ClickAwayListener
            onClickAway={() => {
              console.log('WTF');
              setIsOpen(false);
            }}
          >
            <Fade {...TransitionProps} timeout={100}>
              <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                The content of the Popper.
              </Box>
            </Fade>
          </ClickAwayListener>
        )}
      </Popper>
    </Box>
  );
};
