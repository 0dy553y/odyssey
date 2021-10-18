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
}

export interface CompletedUserChallengeListData {
  challengeId: number;
  completedAt: Date;
}
