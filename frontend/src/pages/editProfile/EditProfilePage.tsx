import React, { useState } from 'react';
import {
  AppBar,
  Avatar,
  Badge,
  Button,
  Box,
  IconButton,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { ReactComponent as BackArrow } from 'assets/icons/arrow-left.svg';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { getUser } from 'store/auth/selectors';
import { updateUser } from 'store/auth/operations';
import { compressThenConvertToBase64DataUrl } from 'utils/file';
import { DataUrl, UserPutData } from 'types/auth';
import UserAvatar from 'components/common/userAvatar';
import CharacterCarousel from 'components/editProfile/CharacterCarousel';

import './EditProfilePage.scss';
import { makeStyles } from '@mui/styles';
import { Character } from 'types/map';
import ConfirmationModal from 'components/common/ConfirmationModal';

const useStyles = makeStyles(() => ({
  header: {
    fontFamily: 'Frock',
    marginBottom: '1em',
  },
  submitButton: {
    mt: 3,
    mb: 2,
    padding: '0.7em 2em 0.7em 2em',
    borderRadius: '1em',
  },
  nameInput: {
    maxWidth: '20em',
  },
}));

interface EditProfileFormState {
  displayName?: string;
}

const EditProfilePage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  // user should never be undefined (assuming auth routing works)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const user = useSelector(getUser)!; //

  const { control, handleSubmit, formState } = useForm<EditProfileFormState>({
    defaultValues: { displayName: user.displayName ?? '' },
  });
  const isFormEdited = formState.isDirty;
  const [isAvatarEdited, setIsAvatarEdited] = useState(false);

  const [avatarBase64DataUrl, setAvatarBase64DataUrl] =
    useState<DataUrl | null>(user.avatar ?? null);
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(
    user.character ?? Character.ASTRONAUT
  );

  const [
    isDiscardChangesConfirmationModalOpen,
    setIsDiscardChangesConfirmationModalOpen,
  ] = useState<boolean>(false);

  const onSubmit = handleSubmit(async (data: EditProfileFormState) => {
    const userPutData: UserPutData = {
      displayName: data.displayName,
      character: selectedCharacter,
      avatar: avatarBase64DataUrl,
    };
    dispatch(updateUser(userPutData, history));
  });

  return (
    <Box className="edit-profile-page">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            style={{ marginLeft: '-1.5em' }}
            edge="start"
            onClick={() => {
              isFormEdited || isAvatarEdited
                ? setIsDiscardChangesConfirmationModalOpen(true)
                : history.goBack();
            }}
          >
            <BackArrow filter="invert(1)" height="1.5em" width="1.5em" />
          </IconButton>
        </Toolbar>
        <Typography component="h1" variant="h1" className={classes.header}>
          Edit Profile
        </Typography>
      </AppBar>

      <ConfirmationModal
        title="Discard changes"
        message="Are you sure? You have unsaved changes."
        isOpen={isDiscardChangesConfirmationModalOpen}
        onConfirm={() => {
          history.goBack();
        }}
        onCancel={() => setIsDiscardChangesConfirmationModalOpen(false)}
      />

      <Box
        component="form"
        noValidate
        onSubmit={onSubmit}
        sx={{
          mt: 1,
          padding: '0 1.5em 0 1.5em',
          width: '100%',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Stack justifyContent="center" alignItems="center">
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
                setIsAvatarEdited(true);
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
                src={avatarBase64DataUrl ?? ''}
                username={user.username}
                displayName={user.displayName}
                character={user.character}
                shouldLinkToProfile={false}
              />
            </Badge>
          </label>

          {avatarBase64DataUrl && (
            <IconButton
              color="warning"
              onClick={() => {
                setAvatarBase64DataUrl(null);
                setIsAvatarEdited(false);
              }}
            >
              <DeleteOutlineIcon />
            </IconButton>
          )}

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
                className={classes.nameInput}
              />
            )}
          />
        </Stack>

        <CharacterCarousel
          selectedCharacter={selectedCharacter}
          setSelectedCharacter={setSelectedCharacter}
        />
        <Button
          type="submit"
          className={classes.submitButton}
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
