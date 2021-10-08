import React, { useReducer } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { REGISTER_ROUTE } from '../../routing/routes';
import { useHistory } from 'react-router-dom';
import { login } from '../../store/auth/operations';
import { useDispatch } from 'react-redux';

interface LoginPageState {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [state, setState] = useReducer(
    (s: LoginPageState, a: Partial<LoginPageState>) => ({
      ...s,
      ...a,
    }),
    {
      username: '',
      password: '',
    }
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login({ ...state }, history));
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
        Login
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          onChange={(event) => setState({ username: event.target.value })}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={(event) => setState({ password: event.target.value })}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Log In
        </Button>
        <Grid item>
          <Link
            variant="body2"
            onClick={() => {
              history.push(REGISTER_ROUTE);
            }}
          >
            No account yet? Register
          </Link>
        </Grid>
      </Box>
    </Box>
  );
};
export default LoginPage;
