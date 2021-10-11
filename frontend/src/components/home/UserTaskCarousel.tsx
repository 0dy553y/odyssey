import React from 'react';
import { UserTaskListData } from '../../types/usertasks';
import UserTaskCard from './UserTaskCard';
import Slider from 'react-slick';

interface Props {
  userTaskList: UserTaskListData[];
}

const UserTaskCarousel: React.FC<Props> = ({ userTaskList }: Props) => {
  return (
    <Slider arrows={false} centerMode infinite={false}>
      {userTaskList.map((userTask: UserTaskListData) => (
        <div key={userTask.id}>
          <UserTaskCard userTask={userTask} />
        </div>
      ))}
    </Slider>
  );
};

export default UserTaskCarousel;
