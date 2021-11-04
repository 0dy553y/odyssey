import { Schedule } from './challenges';
import { UserTaskListData } from './usertasks';

export interface UserChallengeListData {
  challengeId: number;
  percentCompleted: number;
}

export interface UserChallengeData extends UserChallengeListData {
  id: number;
  enrolledDate: Date;
  userTasks: UserTaskListData[];
  schedule: Schedule;
  completedAt?: Date;
  forfeitedAt?: Date;
}

export interface CompletedUserChallengeListData {
  challengeId: number;
  challengeName: string;
  prizeName: string | null;
  completedAt: Date;
}

export interface UserChallengeMapData {
  username: string;
  challengeId: number;
  challengeName: string;
  prizeName: string;
  numTasks: number;
  currentTaskNum: number;
  friends: UserChallengeFriendMapData[];
}

export interface UserChallengeFriendMapData {
  username: string;
  displayName: string;
  currentTaskNum: number;
}
