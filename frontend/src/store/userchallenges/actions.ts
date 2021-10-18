import { userChallengesSlice } from './reducer';

export const {
  updateOngoingUserChallengeData,
  updateOngoingUserChallengesListData,
  updateCompletedUserChallengesListData,
  resetUserChallenges,
} = userChallengesSlice.actions;
