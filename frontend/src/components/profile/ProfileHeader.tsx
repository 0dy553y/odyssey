import React from 'react';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { displayUsername } from 'utils/formatting';
import { UserData } from 'types/auth';
import UserAvatar from 'components/common/userAvatar';
import FriendControls from './FriendControls';

import './ProfileHeader.scss';
import CharacterDisplay from 'components/common/CharacterDisplay';
import { Character } from 'types/map';

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
      <IconButton>
        <Box sx={{ position: 'relative' }}>
          <UserAvatar
            className="avatar"
            src={user.avatar}
            username={user.username}
            displayName={user.displayName}
            shouldLinkToProfile={false}
          />
          <Box
            sx={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              transform: 'translate(40%, -90%)',
            }}
          >
            <CharacterDisplay
              character={Character[user.character]}
              scaleOverride={1.3}
            />
          </Box>
        </Box>
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

      <FriendControls user={user} />
    </Box>
  );
};

export default ProfileHeader;
