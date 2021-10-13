import * as React from 'react';
import { Avatar } from '@mui/material';
import { DataUrl } from 'types/auth';
import { stringAvatar } from 'utils/avatar';

interface UserAvatarProps {
  src: DataUrl;
  displayName?: string;
  username: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  displayName,
  username,
}) => {
  return <Avatar src={src} {...stringAvatar(displayName ?? username)} />;
};

export default UserAvatar;
