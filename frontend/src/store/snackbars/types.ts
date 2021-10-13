export interface CreateSnackbarData {
  message: string;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
}

export type SnackbarKey = number;

export interface Snackbar extends CreateSnackbarData {
  key: SnackbarKey;
}

export interface SnackbarsState {
  nextSnackbarKey: SnackbarKey;
  snackbars: Snackbar[];
}
