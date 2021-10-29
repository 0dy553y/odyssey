import * as React from 'react';
import { Avatar } from '@mui/material';
import { DataUrl } from 'types/auth';
import { stringAvatar } from 'utils/avatar';
import { useHistory } from 'react-router-dom';
import { PROFILE_ROUTE } from 'routing/routes';
import { getUser } from 'store/auth/selectors';
import { useSelector } from 'react-redux';

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
  const history = useHistory();
  const user = useSelector(getUser);

  return (
    <Avatar
      style={{ marginBottom: '0.5em' }}
      className={className}
      src={src}
      {...stringAvatar(displayName ?? username)}
      onClick={() => {
        if (user?.username === username) {
          history.push(`${PROFILE_ROUTE}`);
          return;
        }
        history.push(`${PROFILE_ROUTE}/${username}`);
      }}
    />
  );
};

export default UserAvatar;
