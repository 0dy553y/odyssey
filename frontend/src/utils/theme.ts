import { orange } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: `"CircularStd", "Helvetica", "Arial", sans-serif, "Frock"`,
    h2: {
      fontFamily: 'Frock',
    },
    body1: {
      fontFamily: 'CircularStdMedium',
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
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
