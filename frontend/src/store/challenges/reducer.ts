import produce from 'immer';
import {
  ChallengeActions,
  ChallengesState,
  REMOVE_CHALLENGE,
  SAVE_CHALLENGE,
  SAVE_CHALLENGE_LIST,
} from './types';

const initialState: ChallengesState = {
  challenges: [],
};

const challengesReducer = produce(
  (draft: ChallengesState, action: ChallengeActions) => {
    switch (action.type) {
      case SAVE_CHALLENGE_LIST: {
        draft.challenges = action.challengeList;
        break;
      }
      case SAVE_CHALLENGE: {
        draft.challenges[action.challenge.id] = action.challenge;
        break;
      }
      case REMOVE_CHALLENGE: {
        delete draft.challenges[action.challengeId];
        break;
      }
    }
  },
  initialState
);

export default challengesReducer;
