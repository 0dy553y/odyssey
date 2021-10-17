import { UserChallengeData, UserChallengeListData } from 'types/userchallenge';

type ChallengeId = number;

export interface UserChallengesState {
  ongoingUserChallengeData: Record<ChallengeId, UserChallengeData>;
  ongoingUserChallengesList: UserChallengeListData[];
}
