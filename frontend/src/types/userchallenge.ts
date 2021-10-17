import { UserTaskListData } from './usertasks';

export interface UserChallengeListData {
  challengeId: number;
  percentCompleted: number;
}

export interface UserChallengeData extends UserChallengeListData {
  enrolledDate: Date;
  userTasks: UserTaskListData[];
}

export interface CompletedUserChallengeListData {
  challengeId: number;
  completedAt: number;
}
