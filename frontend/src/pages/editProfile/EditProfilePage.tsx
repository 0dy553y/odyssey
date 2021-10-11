import React from 'react';
import {
  AppBar,
  Avatar,
  Badge,
  Button,
  Box,
  Container,
  Grid,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { getUser } from 'store/auth/selectors';
import { updateUser } from 'store/auth/operations';
import { stringAvatar } from 'utils/avatar';

import './EditProfilePage.scss';

interface EditProfileFormState {
  avatar?: FileList;
  displayName?: string;
}

const EditProfilePage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { register, control, handleSubmit } = useForm<EditProfileFormState>();

  // user should never be undefined (assuming auth routing works)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const user = useSelector(getUser)!; //

  const onSubmit = handleSubmit(
    (data: EditProfileFormState) =>
      dispatch(updateUser({ displayName: data.displayName }))
    // console.log(data)
  );

  return (
    <Box className="edit-profile-page">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" onClick={() => history.goBack()}>
            <ChevronLeft />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Typography component="h1" variant="h5">
        Edit Profile
      </Typography>

      <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
        <Grid container>
          <Grid item xs={12}>
            <Container>
              <label htmlFor="contained-button-file">
                <input
                  className="avatar-input"
                  id="contained-button-file"
                  accept="image/*"
                  type="file"
                  {...register('avatar')}
                />
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={
                    <Avatar className="avatar-camera-badge">
                      <PhotoCamera />
                    </Avatar>
                  }
                >
                  <Avatar
                    src={user.avatar}
                    className="avatar"
                    {...stringAvatar(user.displayName ?? user.username)}
                  />
                </Badge>
              </label>
            </Container>
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="displayName"
              control={control}
              defaultValue={user.displayName ?? ''}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  name="displayName"
                  label="Display Name"
                  id="displayName"
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
          Update Profile
        </Button>
      </Box>
    </Box>
  );
};
export default EditProfilePage;
