import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { REGISTER_ROUTE } from 'routing/routes';
import { useHistory } from 'react-router-dom';
import { login } from 'store/auth/operations';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';

interface LoginFormState {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormState>();

  const onSubmit = handleSubmit((data: LoginFormState) =>
    dispatch(login({ ...data }, history))
  );

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
      <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
        <Controller
          name="username"
          control={control}
          defaultValue=""
          rules={{ required: 'Username is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              error={!!errors.username}
              helperText={errors.username?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: 'Password is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
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
