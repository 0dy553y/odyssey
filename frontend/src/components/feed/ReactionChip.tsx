import React from 'react';
import { Chip, Typography } from '@mui/material';
import { ReactionEmoji } from 'types/posts';
import { displayReactionEmoji } from 'utils/formatting';

import './ReactionChip.scss';

interface ReactionChipProps {
  reaction: ReactionEmoji;
  count: number;
  hasReacted: boolean;
  onClick: () => void;
}

export const ReactionChip: React.FC<ReactionChipProps> = ({
  reaction,
  count,
  hasReacted,
  onClick,
}) => {
  return (
    <Chip
      className="reaction-chip"
      onClick={onClick}
      icon={<Typography>{displayReactionEmoji(reaction)}</Typography>}
      label={<Typography>{count}</Typography>}
      variant={hasReacted ? 'filled' : 'outlined'}
    />
  );
};
