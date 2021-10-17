import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserChallengeData, UserChallengeListData } from 'types/userchallenge';
import { UserChallengesState } from './types';

const initialState: UserChallengesState = {
  ongoingUserChallengeData: {},
  ongoingUserChallengesList: [],
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
    updateOngoingUserChallengesListData: (
      state,
      action: PayloadAction<{ data: UserChallengeListData[] }>
    ) => {
      state.ongoingUserChallengesList = action.payload.data;
    },
  },
});

export default userChallengesSlice.reducer;
