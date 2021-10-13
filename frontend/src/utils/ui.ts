import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { addSnackbar } from 'store/snackbars/actions';
import { ApiResponse, StatusMessage, StatusMessageType } from 'types/api';

export function withStatusMessages<D, S, E>(
  dispatch: ThunkDispatch<S, E, AnyAction>,
  promise: Promise<ApiResponse<D>>
): Promise<ApiResponse<D>> {
  return promise
    .then((response) => {
      const messages = response.messages;
      showStatusMessages(dispatch, messages);
      return response;
    })
    .catch((response) => {
      showStatusMessages(dispatch, response.messages);
      throw response;
    });
}

function showStatusMessages<S, E>(
  dispatch: ThunkDispatch<S, E, AnyAction>,
  messages: StatusMessage[]
) {
  messages.forEach((message) => {
    dispatch(
      addSnackbar({
        message: message.content,
        variant: getSnackbarVariant(message.type),
      })
    );
  });
}

function getSnackbarVariant(type: StatusMessageType) {
  switch (type) {
    case StatusMessageType.Error:
      return 'error';
    case StatusMessageType.Warning:
      return 'warning';
    case StatusMessageType.Information:
      return 'info';
    case StatusMessageType.Success:
      return 'success';
  }
}
