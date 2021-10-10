import React from 'react';
import {
  Avatar,
  Box,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';

import './EditProfilePage.css';

interface EditProfileFormState {
  avatar: File;
  username: string;
  displayName?: string;
  oldPassword?: string;
  newPassword?: string;
  newPasswordConfirmation?: string;
}

const EditProfilePage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<EditProfileFormState>();

  const onSubmit = handleSubmit((data: EditProfileFormState) =>
    console.log(data)
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
        Edit Profile
      </Typography>
      <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
        <Grid container className="edit-profile-page">
          <Grid item xs={12}>
            <Container>
              <IconButton>
                <Avatar
                  src="https://breakbrunch.com/wp-content/uploads/2019/11/cute-bright-smile-112419.jpg"
                  className={'avatar'}
                />
              </IconButton>
            </Container>
          </Grid>

          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default EditProfilePage;
