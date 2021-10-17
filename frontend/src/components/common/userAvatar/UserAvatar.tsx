import * as React from 'react';
import { Avatar } from '@mui/material';
import { DataUrl } from 'types/auth';
import { stringAvatar } from 'utils/avatar';

interface UserAvatarProps {
  src: DataUrl | undefined;
  username: string;
  displayName?: string;
  className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  username,
  displayName,
  className,
}) => {
  return (
    <Avatar
      style={{ marginBottom: '0.5em' }}
      className={className}
      src={src}
      {...stringAvatar(displayName ?? username)}
    />
  );
};

export default UserAvatar;
