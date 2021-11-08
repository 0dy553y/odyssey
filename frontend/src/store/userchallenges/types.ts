import { UserChallengeMapData } from 'types/userchallenge';
import {
  CompletedUserChallengeListData,
  UserChallengeData,
  UserChallengeListData,
} from 'types/userchallenge';

type ChallengeId = number;

export interface UserChallengesState {
  allUserChallengesData: Record<ChallengeId, UserChallengeData[]>;
  ongoingUserChallengesList: UserChallengeListData[];
  ongoingChallengeMapsList: UserChallengeMapData[];
  completedUserChallengesList: CompletedUserChallengeListData[];
  challengeMaps: Record<ChallengeId, UserChallengeMapData>;
}
