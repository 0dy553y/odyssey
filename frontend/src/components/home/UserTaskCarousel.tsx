import React from 'react';
import { UserTaskListData } from '../../types/usertasks';
import UserTaskCard from './UserTaskCard';

interface Props {
  userTaskList: UserTaskListData[];
}

const UserTaskCarousel: React.FC<Props> = ({ userTaskList }: Props) => {
  return (
    <>
      {userTaskList.map((userTask: UserTaskListData) => (
        <UserTaskCard key={userTask.id} userTask={userTask} />
      ))}
    </>
  );
};

export default UserTaskCarousel;
