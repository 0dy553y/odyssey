import React, { useEffect, useState } from 'react';
import api from '../../api';
import { ApiResponse } from '../../types/api';
import { FriendStatus, FriendStatusData } from '../../types/friends';

interface Props {
  userId: number;
}

const FriendControls: React.FC<Props> = ({ userId }: Props) => {
  const [friendStatus, setFriendStatus] = useState<FriendStatus | undefined>(
    undefined
  );

  useEffect(() => {
    api.friends
      .getFriendStatusWithUser(userId)
      .then((response: ApiResponse<FriendStatusData>) => {
        const friendStatus = response.payload.data.friendStatus;
        setFriendStatus(friendStatus);
      });
  }, []);

  if (!friendStatus || friendStatus === FriendStatus.SELF) {
    return <></>;
  }

  return <></>;
};

export default FriendControls;
