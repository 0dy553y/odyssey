import { userChallengesSlice } from './reducer';

export const {
  updateAllUserChallengesData,
  updateOngoingUserChallengesListData,
  updateCompletedUserChallengesListData,
  resetUserChallenges,
} = userChallengesSlice.actions;
