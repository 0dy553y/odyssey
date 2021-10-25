import {
  CompletedUserChallengeListData,
  UserChallengeData,
  UserChallengeListData,
} from 'types/userchallenge';

type ChallengeId = number;

export interface UserChallengesState {
  allUserChallengesData: Record<ChallengeId, UserChallengeData[]>;
  ongoingUserChallengeData: Record<ChallengeId, UserChallengeData>;
  ongoingUserChallengesList: UserChallengeListData[];
  completedUserChallengesList: CompletedUserChallengeListData[];
}
