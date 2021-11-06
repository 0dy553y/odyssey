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
import CheckIcon from '@mui/icons-material/CheckRounded';
import { UserData } from '../../types/auth';
import { displayUsername } from '../../utils/formatting';

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    borderRadius: '20px',
    height: '50px',
    maxWidth: '300px',
    textTransform: 'none',
    marginTop: '20px',
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      filter: 'brightness(1.1)',
    },
  },
  negativeButton: {
    borderRadius: '20px',
    height: '50px',
    maxWidth: '300px',
    textTransform: 'none',
    marginBottom: '12px',
    border: '1px white solid',
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
  const [friendStatus, setFriendStatus] = useState<FriendStatus | undefined>(
    undefined
  );
  const [friendRequestId, setFriendRequestId] = useState<number | undefined>(
    undefined
  );
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const getFriendStatus = () => {
    api.friends
      .getFriendStatusWithUser(user.id)
      .then((response: ApiResponse<FriendStatusData>) => {
        setFriendStatus(response.payload.data.friendStatus);
        setFriendRequestId(response.payload.data.friendRequestId);
      });
  };

  useEffect(getFriendStatus, []);

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
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        PaperProps={{
          style: { borderRadius: '1.5em', padding: '1em' },
        }}
      >
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
              api.friends.deleteFriend(user.id).then(() => {
                getFriendStatus();
              });
            }}
          >
            <Typography variant="body1">Yes</Typography>
          </Button>
          <Button
            className={classes.rejectButton}
            onClick={() => setIsDialogOpen(false)}
          >
            <Typography variant="body1">No</Typography>
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
          getFriendStatus();
        });
      }}
    >
      <Typography variant="body1">Add Friend</Typography>
    </Button>
  );

  const sentFriendRequestDisplay = (
    <>
      <Button
        variant="contained"
        fullWidth
        disableElevation
        className={classes.button}
        onClick={() => setIsDialogOpen(true)}
      >
        <Typography variant="body1">Friend Request Sent</Typography>
      </Button>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>
          {`Cancel friend request to ${
            user.displayName ?? displayUsername(user.username)
          }?`}
        </DialogTitle>
        <DialogActions>
          <Button
            className={classes.acceptButton}
            onClick={() => {
              setIsDialogOpen(false);
              // Friend request ID must be defined when friend request is sent.
              api.friendRequests
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                .rejectFriendRequest(friendRequestId!)
                .then(() => {
                  getFriendStatus();
                });
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

  const receivedFriendRequestDisplay = (
    <>
      <Button
        variant="contained"
        fullWidth
        disableElevation
        className={classes.button}
        onClick={() => {
          // Friend request ID must be defined when friend request is received.
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          api.friendRequests.acceptFriendRequest(friendRequestId!).then(() => {
            getFriendStatus();
          });
        }}
      >
        <Typography variant="body1">Confirm Friend Request</Typography>
      </Button>
      <Button
        variant="outlined"
        fullWidth
        disableElevation
        className={classes.negativeButton}
        sx={{ marginTop: '1em' }}
        onClick={() => {
          // Friend request ID must be defined when friend request is received.
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          api.friendRequests.rejectFriendRequest(friendRequestId!).then(() => {
            getFriendStatus();
          });
        }}
      >
        <Typography variant="body1">Reject Friend Request</Typography>
      </Button>
    </>
  );

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
