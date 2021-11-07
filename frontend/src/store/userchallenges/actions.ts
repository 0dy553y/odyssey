import { userChallengesSlice } from './reducer';

export const {
  updateAllUserChallengesData,
  updateOngoingUserChallengesListData,
  updateCompletedUserChallengesListData,
  updateOngoingChallengeMapsData,
  updateChallengeMapData,
  resetUserChallenges,
} = userChallengesSlice.actions;
