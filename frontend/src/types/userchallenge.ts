import { Schedule } from './challenges';
import { UserTaskListData } from './usertasks';

export interface UserChallengeListData {
  challengeId: number;
  percentCompleted: number;
}

export interface UserChallengeData extends UserChallengeListData {
  enrolledDate: Date;
  userTasks: UserTaskListData[];
  schedule: Schedule;
  completedAt?: Date;
  forfeitedAt?: Date;
}

export interface CompletedUserChallengeListData {
  challengeId: number;
  completedAt: Date;
}
