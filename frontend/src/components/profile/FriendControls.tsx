import React, { useEffect, useState } from 'react';
import api from '../../api';
import { ApiResponse } from '../../types/api';
import { FriendStatus, FriendStatusData } from '../../types/friends';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Theme,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import CheckIcon from '@mui/icons-material/Check';
import { UserData } from '../../types/auth';
import { displayUsername } from '../../utils/formatting';
import { deleteFriend } from '../../store/friends/operations';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    borderRadius: '20px',
    height: '50px',
    maxWidth: '300px',
    textTransform: 'none',
    marginBottom: '12px',
    backgroundColor: theme.palette.primary.main,
  },
  icon: {
    marginRight: '8px',
    marginBottom: '2px',
  },
  acceptButton: {
    color: theme.palette.primary.main,
    backgroundColor: 'transparent',
  },
  rejectButton: {
    color: theme.palette.secondary.main,
    backgroundColor: 'transparent',
  },
}));

interface Props {
  user: UserData;
}

const FriendControls: React.FC<Props> = ({ user }: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [friendStatus, setFriendStatus] = useState<FriendStatus | undefined>(
    undefined
  );
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    api.friends
      .getFriendStatusWithUser(user.id)
      .then((response: ApiResponse<FriendStatusData>) => {
        const friendStatus = response.payload.data.friendStatus;
        setFriendStatus(friendStatus);
      });
  }, []);

  if (friendStatus === undefined || friendStatus === FriendStatus.SELF) {
    return <></>;
  }

  const friendsDisplay = (
    <>
      <Button
        variant="contained"
        fullWidth
        disableElevation
        className={classes.button}
        onClick={() => setIsDialogOpen(true)}
      >
        <CheckIcon className={classes.icon} />
        <Typography variant="body1">Friends</Typography>
      </Button>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>
          {`Remove ${
            user.displayName ?? displayUsername(user.username)
          } as friend?`}
        </DialogTitle>
        <DialogActions>
          <Button
            className={classes.acceptButton}
            onClick={() => {
              setIsDialogOpen(false);
              dispatch(deleteFriend(user.id));
              setFriendStatus(FriendStatus.NOT_FRIENDS);
            }}
          >
            Yes
          </Button>
          <Button
            className={classes.rejectButton}
            onClick={() => setIsDialogOpen(false)}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );

  const notFriendsDisplay = (
    <Button
      variant="contained"
      fullWidth
      disableElevation
      className={classes.button}
      onClick={() => {
        api.friendRequests.sendFriendRequest(user.id).then(() => {
          setFriendStatus(FriendStatus.FRIEND_REQUEST_SENT);
        });
      }}
    >
      <Typography variant="body1">Add Friend</Typography>
    </Button>
  );

  const sentFriendRequestDisplay = <></>;

  const receivedFriendRequestDisplay = <></>;

  switch (friendStatus) {
    case FriendStatus.FRIENDS:
      return friendsDisplay;
    case FriendStatus.NOT_FRIENDS:
      return notFriendsDisplay;
    case FriendStatus.FRIEND_REQUEST_SENT:
      return sentFriendRequestDisplay;
    case FriendStatus.FRIEND_REQUEST_RECEIVED:
      return receivedFriendRequestDisplay;
    default:
      return <></>;
  }
};

export default FriendControls;
