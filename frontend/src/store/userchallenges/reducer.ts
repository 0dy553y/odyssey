import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CompletedUserChallengeListData,
  UserChallengeData,
  UserChallengeListData,
} from 'types/userchallenge';
import { UserChallengesState } from './types';

const initialState: UserChallengesState = {
  ongoingUserChallengeData: {},
  ongoingUserChallengesList: [],
  completedUserChallengesList: [],
};

export const userChallengesSlice = createSlice({
  name: 'userChallenges',
  initialState,
  reducers: {
    updateOngoingUserChallengeData: (
      state,
      action: PayloadAction<{ challengeId: number; data: UserChallengeData }>
    ) => {
      state.ongoingUserChallengeData[action.payload.challengeId] =
        action.payload.data;
    },
    removeOngoingUserChallengeData: (
      state,
      action: PayloadAction<{ challengeId: number }>
    ) => {
      delete state.ongoingUserChallengeData[action.payload.challengeId];
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
      state.ongoingUserChallengeData = {};
      state.ongoingUserChallengesList = [];
      state.completedUserChallengesList = [];
    },
  },
});

export default userChallengesSlice.reducer;
