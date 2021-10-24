import { LandingEmailPostData } from '../../types/landingemails';
import { ThunkDispatch } from 'redux-thunk';
import { OperationResult } from '../../types/store';
import { withStatusMessages } from 'utils/ui';
import { AnyAction } from 'redux';
import api from '../../api';
import { RootState } from '../index';

export function registerEmail(
  landingEmailData: LandingEmailPostData
): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    await withStatusMessages(
      dispatch,
      api.landingEmails.registerEmail(landingEmailData)
    );
  };
}
