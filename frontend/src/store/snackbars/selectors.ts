import { RootState } from '../index';
import { Snackbar, SnackbarsState } from './types';

function getLocalState(state: RootState): SnackbarsState {
  return state.snackbars;
}

export function getSnackbars(state: RootState): Snackbar[] {
  return getLocalState(state).snackbars;
}
