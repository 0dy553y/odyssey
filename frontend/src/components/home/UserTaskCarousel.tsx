import React from 'react';
import { UserTaskListData } from '../../types/usertasks';
import UserTaskCard from './UserTaskCard';
import { Swiper, SwiperSlide } from 'swiper/react';

import './UserTaskCarousel.scss';

interface Props {
  userTaskList: UserTaskListData[];
}

const UserTaskCarousel: React.FC<Props> = ({ userTaskList }: Props) => {
  return (
    <Swiper
      centeredSlides
      slidesPerView={1.3}
      spaceBetween={20}
      slideToClickedSlide
      className="task-slider"
    >
      {userTaskList.map((userTask: UserTaskListData) => (
        <SwiperSlide key={userTask.id}>
          <UserTaskCard userTask={userTask} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default UserTaskCarousel;
