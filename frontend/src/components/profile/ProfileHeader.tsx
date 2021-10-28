import React from 'react';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { displayUsername } from 'utils/formatting';
import { UserData } from 'types/auth';
import UserAvatar from 'components/common/userAvatar';

import './ProfileHeader.scss';
import { Skeleton } from '@mui/lab';

interface ProfileHeaderProps {
  user?: UserData;
  userProfileItems: { label: string; count: number; onClick?: () => void }[];
}

const ProfileHeader: React.FC<ProfileHeaderProps> = (props) => {
  const { userProfileItems, user } = props;

  if (!user) {
    return <Skeleton />;
  }

  return (
    <Box className="profile-header">
      <IconButton>
        <UserAvatar
          className="avatar"
          src={user.avatar}
          username={user.username}
          displayName={user.displayName}
        />
      </IconButton>

      <Typography component="h1" variant="h5">
        {user.displayName}
      </Typography>

      <Typography
        component="h2"
        variant="body1"
        className="username"
        gutterBottom
      >
        {displayUsername(user.username)}
      </Typography>

      <Stack direction="row" spacing={4}>
        {userProfileItems.map((item) => (
          <Box
            key={item.label}
            className={'user-profile-item-container'}
            sx={{ width: 1 / userProfileItems.length }}
            onClick={item.onClick}
          >
            <Typography component="div" variant="body1" className="hand-cursor">
              {item.count} <br />
              {item.label}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default ProfileHeader;
