import produce from 'immer';
import {
  ChallengeActions,
  ChallengesState,
  REMOVE_CHALLENGE,
  SAVE_CHALLENGE,
  SAVE_CHALLENGE_LIST,
} from './types';
import { ChallengeListData } from '../../types/challenges';

const initialState: ChallengesState = {
  challengeList: [],
  challenges: {},
};

const challengesReducer = produce(
  (draft: ChallengesState, action: ChallengeActions) => {
    switch (action.type) {
      case SAVE_CHALLENGE_LIST: {
        draft.challengeList = action.challengeList;
        break;
      }
      case SAVE_CHALLENGE: {
        if (!draft.challengeList.includes(action.challenge)) {
          draft.challengeList.push(action.challenge);
        }
        draft.challenges[action.challenge.id] = action.challenge;
        break;
      }
      case REMOVE_CHALLENGE: {
        draft.challengeList = draft.challengeList.filter(
          (challenge: ChallengeListData) => challenge.id !== action.challengeId
        );
        delete draft.challenges[action.challengeId];
        break;
      }
    }
  },
  initialState
);

export default challengesReducer;
