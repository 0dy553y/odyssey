import React, { useState } from 'react';
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
import { ReactComponent as BackArrow } from 'assets/icons/arrow-left.svg';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { getUser } from 'store/auth/selectors';
import { updateUser } from 'store/auth/operations';
import { compressThenConvertToBase64DataUrl } from 'utils/file';
import { DataUrl, UserPutData } from 'types/auth';
import UserAvatar from 'components/common/userAvatar';

import './EditProfilePage.scss';

interface EditProfileFormState {
  displayName?: string;
}

const EditProfilePage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm<EditProfileFormState>();

  // user should never be undefined (assuming auth routing works)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const user = useSelector(getUser)!; //

  const [avatarBase64DataUrl, setAvatarBase64DataUrl] =
    useState<DataUrl | null>(null);

  const onSubmit = handleSubmit(async (data: EditProfileFormState) => {
    const userPutData: UserPutData = { displayName: data.displayName };
    if (avatarBase64DataUrl) {
      userPutData.avatar = avatarBase64DataUrl;
    }
    dispatch(updateUser(userPutData));
  });

  return (
    <Box className="edit-profile-page">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            style={{ marginLeft: '-1.5em' }}
            edge="start"
            onClick={() => history.goBack()}
          >
            <BackArrow filter="invert(1)" height="1.5em" width="1.5em" />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Typography component="h1" variant="h5">
        Edit Profile
      </Typography>

      <Box
        component="form"
        noValidate
        onSubmit={onSubmit}
        sx={{ mt: 1, padding: '0 1.5em 0 1.5em' }}
      >
        <Grid container>
          <Grid item xs={12}>
            <Container className="avatar-container">
              <label htmlFor="contained-button-file">
                <input
                  className="avatar-input"
                  id="contained-button-file"
                  accept="image/*"
                  type="file"
                  onChange={async (e) => {
                    const files = e.target.files;
                    if (!files || files.length === 0) {
                      return;
                    }

                    const avatarFile = files[0];
                    const avatarB64 = await compressThenConvertToBase64DataUrl(
                      avatarFile
                    );
                    setAvatarBase64DataUrl(avatarB64);
                  }}
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
                  <UserAvatar
                    className="avatar"
                    src={avatarBase64DataUrl || user.avatar}
                    username={user.username}
                    displayName={user.displayName}
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
