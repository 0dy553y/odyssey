import React from 'react';
import { UserTaskListData } from '../../types/usertasks';
import { Card } from '@mui/material';

interface Props {
  userTask: UserTaskListData;
}

const UserTaskCard: React.FC<Props> = ({ userTask }: Props) => {
  return <Card>{userTask.name}</Card>;
};

export default UserTaskCard;
