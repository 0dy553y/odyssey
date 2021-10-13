import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: `"CircularStd", "Helvetica", "Arial", sans-serif, "Frock"`,
    h2: {
      fontFamily: 'Frock',
    },
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
