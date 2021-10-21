import { userChallengesSlice } from './reducer';

export const {
  updateOngoingUserChallengeData,
  removeOngoingUserChallengeData,
  updateOngoingUserChallengesListData,
  updateCompletedUserChallengesListData,
  resetUserChallenges,
} = userChallengesSlice.actions;
