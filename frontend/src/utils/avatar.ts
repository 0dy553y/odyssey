/**
 * Code in this file is adapted from
 * https://mui.com/components/avatars/#BackgroundLetterAvatars.tsx
 */

import { AvatarProps } from '@mui/material';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }

  return color;
}

export function stringAvatar(name: string): AvatarProps {
  const words = name.split(' ');
  const nameInitials = words
    .map((word) => {
      if (word.length === 0) {
        return '';
      }
      return word[0];
    })
    .join('');

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: nameInitials,
  };
}
