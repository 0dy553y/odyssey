import React, { useState, useRef } from 'react';
import SentimentSatisfiedRoundedIcon from '@mui/icons-material/SentimentSatisfiedRounded';
import AddIcon from '@mui/icons-material/Add';
import {
  Badge,
  Box,
  ClickAwayListener,
  Fade,
  IconButton,
  Popper,
  Theme,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ReactionEmoji } from 'types/posts';
import { displayReactionEmoji } from 'utils/formatting';

interface ReactionPickerProps {
  onReactionSelect: (emoji: ReactionEmoji) => void;
}

const orangeColor = '#ffad14';
const useStyles = makeStyles((theme: Theme) => ({
  addIcon: {
    fontSize: 'medium',
    color: orangeColor,
  },
  smileyIcon: {
    color: orangeColor,
  },
  popover: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(3),
    boxShadow:
      'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
  },
  emojiButton: {
    color: 'black',
  },
}));

export const ReactionPicker: React.FC<ReactionPickerProps> = ({
  onReactionSelect,
}) => {
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const buttonRef = useRef<null | HTMLButtonElement>(null);

  return (
    <Box component="span" className="reaction-picker">
      <IconButton onClick={() => setIsOpen(true)} ref={buttonRef}>
        <Badge
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={<AddIcon className={classes.addIcon} />}
        >
          <SentimentSatisfiedRoundedIcon className={classes.smileyIcon} />
        </Badge>
      </IconButton>

      <Popper
        open={isOpen}
        anchorEl={buttonRef.current}
        placement="top"
        transition
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={() => setIsOpen(false)}>
            <Fade {...TransitionProps} timeout={100}>
              <Box className={classes.popover}>
                {Object.values(ReactionEmoji).map((emoji) => (
                  <IconButton
                    size="small"
                    key={emoji}
                    className={classes.emojiButton}
                    onClick={() => {
                      onReactionSelect(emoji);
                      setIsOpen(false);
                    }}
                  >
                    {displayReactionEmoji(emoji as ReactionEmoji)}
                  </IconButton>
                ))}
              </Box>
            </Fade>
          </ClickAwayListener>
        )}
      </Popper>
    </Box>
  );
};
