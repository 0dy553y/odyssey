import React, { useState, useEffect } from 'react';
import { removeSnackbar } from 'store/snackbars/actions';
import { useSnackbar } from 'notistack';
import { getSnackbars } from 'store/snackbars/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { SnackbarKey } from 'store/snackbars/types';

const Notifier: React.FC = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const snackbars = useSelector(getSnackbars);

  const [displayedSnackbarKeys, setDisplayedSnackbarKeys] = useState<
    SnackbarKey[]
  >([]);

  useEffect(() => {
    snackbars.map((snackbar) => {
      // If snackbar already displayed, abort
      if (displayedSnackbarKeys.includes(snackbar.key)) {
        return;
      }

      const key = enqueueSnackbar(snackbar.message, {
        variant: snackbar.variant,
        onClick: () => closeSnackbar(key),
      });

      setDisplayedSnackbarKeys([...displayedSnackbarKeys, snackbar.key]);

      dispatch(removeSnackbar(snackbar.key));
    });
  }, [snackbars, displayedSnackbarKeys]);

  return <></>;
};

export default Notifier;
