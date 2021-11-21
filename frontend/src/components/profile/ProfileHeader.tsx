import React from 'react';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { displayUsername } from 'utils/formatting';
import { UserData } from 'types/auth';
import UserAvatar from 'components/common/userAvatar';
import FriendControls from './FriendControls';

import './ProfileHeader.scss';

interface ProfileHeaderProps {
  user?: UserData;
  userProfileItems: { label: string; count: number; onClick?: () => void }[];
}

const ProfileHeader: React.FC<ProfileHeaderProps> = (props) => {
  const { userProfileItems, user } = props;

  if (!user) {
    return <></>;
  }

  return (
    <Box className="profile-header">
      <Box
        sx={{
          position: 'relative',
          justifyContent: 'center',
          display: 'flex',
        }}
      >
        <UserAvatar
          className="avatar"
          src={user.avatar}
          username={user.username}
          displayName={user.displayName}
          character={user.character}
          shouldLinkToProfile={false}
        />
      </Box>

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

      <Stack direction="row" spacing={4} alignItems="center">
        {userProfileItems.map((item) => (
          <Box
            key={item.label}
            className={'user-profile-item-container'}
            onClick={item.onClick}
          >
            <Typography component="div" variant="body1" className="hand-cursor">
              {item.count} <br />
              {item.label}
            </Typography>
          </Box>
        ))}
      </Stack>

      <FriendControls user={user} />
    </Box>
  );
};

export default ProfileHeader;
