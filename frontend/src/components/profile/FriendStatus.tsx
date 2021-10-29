import React from 'react';

interface Props {
  isOwnProfilePage: boolean;
}

const FriendStatus: React.FC<Props> = ({ isOwnProfilePage }: Props) => {
  if (isOwnProfilePage) {
    return <></>;
  }

  return <></>;
};

export default FriendStatus;
