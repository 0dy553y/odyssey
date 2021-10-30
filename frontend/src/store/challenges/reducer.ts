import produce from 'immer';
import {
  ChallengeActions,
  ChallengesState,
  REMOVE_CHALLENGE,
  SAVE_CHALLENGE,
  SAVE_CHALLENGE_LIST,
  SAVE_CHALLENGE_MAPS,
} from './types';

const initialState: ChallengesState = {
  challengeList: [],
  challenges: {},
  challengeMaps: [],
};

const challengesReducer = produce(
  (draft: ChallengesState, action: ChallengeActions) => {
    switch (action.type) {
      case SAVE_CHALLENGE_LIST: {
        draft.challengeList = action.challengeList;
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
      case SAVE_CHALLENGE_MAPS: {
        draft.challengeMaps = action.challengeMaps;
        break;
      }
    }
  },
  initialState
);

export default challengesReducer;
