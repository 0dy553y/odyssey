import { ChallengeMapTheme, Schedule } from './challenges';
import { Character } from './map';
import { UserTaskListData } from './usertasks';

export interface UserChallengeListData {
  challengeId: number;
  percentCompleted: number;
  challengeName: string;
  prizeName: string;
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
  character: Character;
  challengeId: number;
  challengeName: string;
  prizeName: string;
  numTasks: number;
  currentTaskNum: number;
  friends: UserChallengeFriendMapData[];
  mapTheme: ChallengeMapTheme;
}

export interface UserChallengeFriendMapData {
  username: string;
  displayName: string;
  character: Character;
  currentTaskNum: number;
}
