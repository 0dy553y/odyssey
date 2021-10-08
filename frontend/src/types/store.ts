import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../store';
import { AnyAction } from 'redux';

export type OperationResult = (
  dispatch: ThunkDispatch<RootState, undefined, AnyAction>
) => Promise<void>;
