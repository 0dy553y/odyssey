import { userChallengesSlice } from './reducer';

export const {
  updateAllUserChallengesData,
  updateOngoingUserChallengesListData,
  updateCompletedUserChallengesListData,
  updateOngoingChallengeMapsData,
  resetUserChallenges,
} = userChallengesSlice.actions;
