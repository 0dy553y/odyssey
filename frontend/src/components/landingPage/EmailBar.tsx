import React from 'react';
import { Box, Typography, InputBase, Button, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';
import obebebe from '../../assets/gifs/obebebe.gif';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { registerEmail } from 'store/landingemails/operations';

const useStyles = makeStyles(() => ({
  landingHeader: {
    height: '20em',
    background: 'linear-gradient(to right, #7B70BF , #BF8E82)',
    position: 'relative',
    borderRadius: '2em',
    margin: '10em -45vw 1em -45vw',
    minWidth: '90vw',
    left: '50%',
    right: '50%',
    width: '90vw',
    padding: '3em',
    display: 'Flex',
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emailInput: {
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
  emailField: {
    display: 'Flex',
  },
  emailButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '1em',
    color: 'white',
    padding: '0.8em',
    marginTop: '2.2em',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
  },
  astronaut: {
    display: 'inline-block',
    height: '20em',
    objectFit: 'none',
  },
  text: {
    display: 'inline-block',
  },
  cta: {
    color: 'white',
    padding: '0.5em 0 0.5em 0',
  },
}));

interface EarlyAccessFormState {
  email: string;
}

const EmailBar: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<EarlyAccessFormState>();

  const onSubmit = handleSubmit((data: EarlyAccessFormState) =>
    dispatch(registerEmail({ ...data }))
  );

  return (
    <Box className={classes.landingHeader} id="form">
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 5 }}
      >
        <img className={classes.astronaut} src={obebebe} />
        <Box className="text">
          <Typography variant="h4" className={classes.headerText}>
            Don&apos;t miss out on our takeoff 🚀
          </Typography>
          <Typography className={classes.cta}>
            Odyssey will be ready very soon. Join us for early access and keep
            up with updates and our release!
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={onSubmit}
            className={classes.emailField}
          >
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: 'Email is required!',
                pattern: {
                  value: /.+@.+\..+/,
                  message: 'Please enter a valid email format.',
                },
              }}
              render={({ field }) => (
                <InputBase
                  {...field}
                  required
                  className={classes.emailInput}
                  placeholder="Your email"
                  error={!!errors.email}
                ></InputBase>
              )}
            />
            <Button type="submit" className={classes.emailButton}>
              Join
            </Button>
            <br style={{ clear: 'both' }} />
            <br style={{ clear: 'both' }} />
            <br style={{ clear: 'both' }} />
          </Box>
          <Typography className={classes.cta}>
            {errors.email?.message}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default EmailBar;
