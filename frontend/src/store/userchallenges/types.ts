import { ChallengeMapData } from 'types/challenges';
import {
  CompletedUserChallengeListData,
  UserChallengeData,
  UserChallengeListData,
} from 'types/userchallenge';

type ChallengeId = number;

export interface UserChallengesState {
  allUserChallengesData: Record<ChallengeId, UserChallengeData[]>;
  ongoingUserChallengesList: UserChallengeListData[];
  ongoingChallengeMapsList: ChallengeMapData[];
  completedUserChallengesList: CompletedUserChallengeListData[];
}
