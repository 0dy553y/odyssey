import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CompletedUserChallengeListData,
  UserChallengeData,
  UserChallengeListData,
} from 'types/userchallenge';
import { UserChallengesState } from './types';

const initialState: UserChallengesState = {
  allUserChallengesData: {},
  ongoingUserChallengesList: [],
  completedUserChallengesList: [],
};

export const userChallengesSlice = createSlice({
  name: 'userChallenges',
  initialState,
  reducers: {
    updateAllUserChallengesData: (
      state,
      action: PayloadAction<{ challengeId: number; data: UserChallengeData[] }>
    ) => {
      state.allUserChallengesData[action.payload.challengeId] =
        action.payload.data;
    },
    updateOngoingUserChallengesListData: (
      state,
      action: PayloadAction<{ data: UserChallengeListData[] }>
    ) => {
      state.ongoingUserChallengesList = action.payload.data;
    },
    updateCompletedUserChallengesListData: (
      state,
      action: PayloadAction<{ data: CompletedUserChallengeListData[] }>
    ) => {
      state.completedUserChallengesList = action.payload.data;
    },
    resetUserChallenges: (state) => {
      state.allUserChallengesData = {};
      state.ongoingUserChallengesList = [];
      state.completedUserChallengesList = [];
    },
  },
});

export default userChallengesSlice.reducer;
