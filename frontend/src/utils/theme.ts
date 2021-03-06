import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#B892D5',
      contrastText: 'white',
    },
    secondary: {
      main: '#000',
    },
    warning: {
      main: '#B57B7B',
    },
    background: {
      paper: '#fff',
    },
  },
  typography: {
    fontFamily: `"CircularStd", "Helvetica", "Arial", sans-serif, "Frock"`,
    h1: {
      fontFamily: 'Frock',
      fontSize: '40px',
    },
    h2: {
      fontFamily: 'Frock',
    },
    h5: {
      fontSize: '20px',
    },
    h6: {
      fontSize: '18px',
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
    MuiButton: {
      styleOverrides: {
        root: {
          background: 'black',
          textTransform: 'none',
        },
        outlined: {
          background: 'transparent',
          borderColor: 'black',
          color: 'black',
        },
      },
    },
  },
});

export default theme;
