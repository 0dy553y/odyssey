import React, { useReducer } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { LOGIN_ROUTE } from '../../routing/routes';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../store/auth/operations';

interface RegistrationPageState {
  username: string;
  password: string;
  passwordConfirmation: string;
}

const RegistrationPage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [state, setState] = useReducer(
    (s: RegistrationPageState, a: Partial<RegistrationPageState>) => ({
      ...s,
      ...a,
    }),
    {
      username: '',
      password: '',
      passwordConfirmation: '',
    }
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(registerUser({ ...state }, history));
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="username"
              label="Username"
              id="username"
              onChange={(event) => setState({ username: event.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(event) => setState({ password: event.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              onChange={(event) =>
                setState({ passwordConfirmation: event.target.value })
              }
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Grid item>
          <Link
            variant="body2"
            onClick={() => {
              history.push(LOGIN_ROUTE);
            }}
          >
            Already have an account? Sign in
          </Link>
        </Grid>
      </Box>
    </Box>
  );
};
export default RegistrationPage;
