import * as React from 'react';
import { Avatar } from '@mui/material';
import { UserData } from 'types/auth';
import { stringAvatar } from 'utils/avatar';

interface UserAvatarProps {
  user: UserData;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
  return (
    <Avatar
      src={user.avatar}
      {...stringAvatar(user.displayName ?? user.username)}
    />
  );
};

export default UserAvatar;
