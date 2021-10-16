import { UserChallengeData } from 'types/userchallenge';

type ChallengeId = number;

export interface UserChallengesState {
  latestUserChallengeData: Record<ChallengeId, UserChallengeData>;
}
