import React from 'react';
import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { displayUsername } from 'utils/formatting';
import { UserData } from 'types/auth';

const useStyles = makeStyles(() =>
  createStyles({
    avatar: {
      width: '20vh',
      height: '20vh',
    },
  })
);

interface ProfileHeaderProps {
  user: UserData;
  userProfileItems: { label: string; count: number }[];
}

const ProfileHeader: React.FC<ProfileHeaderProps> = (props) => {
  const { userProfileItems, user } = props;

  const classes = useStyles();

  return (
    <Box>
      <IconButton>
        <Avatar
          src="https://breakbrunch.com/wp-content/uploads/2019/11/cute-bright-smile-112419.jpg"
          className={classes.avatar}
        />
      </IconButton>

      {user.displayName && (
        <Typography component="h1" variant="h4">
          {user.displayName}
        </Typography>
      )}

      <Typography component="h2" variant="h5" gutterBottom>
        {displayUsername(user.username)}
      </Typography>

      <Stack direction="row" spacing={4}>
        {userProfileItems.map((item) => (
          <Box
            key={item.label}
            display="flex"
            justifyContent="center"
            sx={{ width: 1 / userProfileItems.length }}
          >
            <Typography component="div" variant="body1">
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
