import React from 'react';
import { Button, TextField, Link, Grid, Box, Typography } from '@mui/material';
import { LOGIN_ROUTE } from 'routing/routes';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from 'store/auth/operations';
import { useForm, Controller } from 'react-hook-form';
import { getRedirectUrl } from '../../store/auth/selectors';

interface RegistrationFormState {
  username: string;
  displayName: string;
  password: string;
  passwordConfirmation: string;
}

const RegistrationPage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<RegistrationFormState>();
  const redirectUrl = useSelector(getRedirectUrl);

  const onSubmit = handleSubmit((data: RegistrationFormState) => {
    const displayName = data.displayName;
    dispatch(
      registerUser(
        {
          ...data,
          displayName: displayName.length !== 0 ? displayName : undefined,
        },
        history,
        redirectUrl
      )
    );
  });

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2em 1.5em 0 1.5em',
      }}
    >
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="username"
              control={control}
              defaultValue=""
              rules={{
                required: 'Username is required',
                pattern: {
                  value: /^[a-zA-Z0-9_.]*$/,
                  message: 'Username cannot contain special characters.',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
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
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="displayName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  id="displayName"
                  label="Display Name"
                  name="displayName"
                  error={!!errors.displayName}
                  helperText={errors.displayName?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters long',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="passwordConfirmation"
              control={control}
              defaultValue=""
              rules={{
                required: 'Please confirm your password',
                validate: (passwordConfirmation) =>
                  passwordConfirmation === getValues().password ||
                  'Passwords do not match',
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  fullWidth
                  name="passwordConfirmation"
                  label="Confirm Password"
                  type="password"
                  id="passwordConfirmation"
                  error={!!errors.passwordConfirmation}
                  helperText={errors.passwordConfirmation?.message}
                />
              )}
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
