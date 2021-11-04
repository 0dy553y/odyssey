import { Theme, useMediaQuery } from '@mui/material';

export const useIsDesktop = (): boolean => {
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  return isDesktop;
};
