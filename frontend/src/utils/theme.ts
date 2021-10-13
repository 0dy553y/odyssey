import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: `"CircularStd", "Helvetica", "Arial", sans-serif`,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'transparent',
          boxShadow: 'none',
          color: 'black',
        },
      },
    },
  },
});

export default theme;
