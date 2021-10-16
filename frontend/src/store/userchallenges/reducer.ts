import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserChallengeData } from 'types/userchallenge';
import { UserChallengesState } from './types';

const initialState: UserChallengesState = {
  latestUserChallengeData: {},
};

export const userChallengesSlice = createSlice({
  name: 'userChallenges',
  initialState,
  reducers: {
    updateLatestUserChallengeData: (
      state,
      action: PayloadAction<{ challengeId: number; data: UserChallengeData }>
    ) => {
      state.latestUserChallengeData[action.payload.challengeId] =
        action.payload.data;
    },
  },
});

export default userChallengesSlice.reducer;
