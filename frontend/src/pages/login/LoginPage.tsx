import React from 'react';
import { makeStyles } from '@mui/styles';
import { Button, Box, TextField, Link, Grid, Typography } from '@mui/material';
import { REGISTER_ROUTE } from 'routing/routes';
import { useHistory } from 'react-router-dom';
import { login } from 'store/auth/operations';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { getRedirectUrl } from '../../store/auth/selectors';
import landscape from 'assets/images/background.png';

interface LoginFormState {
  username: string;
  password: string;
}

const useStyles = makeStyles(() => ({
  handCursor: {
    cursor: 'pointer',
  },
  inputField: {
    root: {
      [`& fieldset`]: {
        borderRadius: 15,
      },
    },
    '& .MuiFilledInput-root': {
      background: 'rgb(159, 136, 227, 0.2)',
    },
  },
  inputBase: {
    padding: '0.7em',
    minWidth: '50px',
    width: '40vw',
    maxWidth: '300px',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: '1em',
    color: 'white',
    marginTop: '2em',
    marginRight: '1em',
  },
  submitButton: {
    mt: 3,
    mb: 2,
    padding: '0.7em 2em 0.7em 2em',
    borderRadius: '1em',
    margin: '2em 0 1em 0',
  },
  title: {
    fontFamily: 'frock',
  },
  background: {
    // backgroundColor: '#cec3ec',
    height: '100vh',
  },
  card: {
    backgroundColor: 'white',
    // padding: '3em',
    borderRadius: '3em',
    maxWidth: '90vw',
    width: '30em',
    boxShadow: '12px 12px 25px 0px #ac89a5',
  },
  landscape: {
    width: '100%',
    borderRadius: '3em 3em 0 0',
  },
  form: {
    padding: '1em 3em 2em 3em',
  },
}));

const LoginPage: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormState>();
  const redirectUrl = useSelector(getRedirectUrl);

  const onSubmit = handleSubmit((data: LoginFormState) =>
    dispatch(login({ ...data }, history, redirectUrl))
  );

  return (
    <Box
      sx={{
        padding: '5em 1.5em 0 1.5em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
      className={classes.background}
    >
      <div className={classes.card}>
        <img src={landscape} className={classes.landscape} />
        <div className={classes.form}>
          <Typography className={classes.title} component="h1" variant="h4">
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
                  variant="filled"
                  className={classes.inputField}
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
                  variant="filled"
                  className={classes.inputField}
                />
              )}
            />
            <br />
            <Button
              type="submit"
              variant="contained"
              className={classes.submitButton}
            >
              Log In
            </Button>
            <Grid item>
              <Link
                variant="body2"
                onClick={() => {
                  history.push(REGISTER_ROUTE);
                }}
                className={classes.handCursor}
              >
                No account yet? Register
              </Link>
            </Grid>
          </Box>
        </div>
      </div>
    </Box>
  );
};
export default LoginPage;
