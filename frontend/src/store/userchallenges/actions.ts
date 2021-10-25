import { userChallengesSlice } from './reducer';

export const {
  updateOngoingUserChallengeData,
  removeOngoingUserChallengeData,
  updateAllUserChallengesData,
  updateOngoingUserChallengesListData,
  updateCompletedUserChallengesListData,
  resetUserChallenges,
} = userChallengesSlice.actions;
