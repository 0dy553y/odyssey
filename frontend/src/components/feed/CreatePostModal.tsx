import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  useMediaQuery,
  useTheme,
  Theme,
  TextField,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { makeStyles } from '@mui/styles';

import './ReactionChip.scss';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

interface CreatePostFormState {
  challengeId: number | string | null;
  body: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  createPostForm: {
    '&>:not(:last-child)': {
      marginBottom: '1em',
    },
  },
}));

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const shouldFullScreen = useMediaQuery(theme.breakpoints.only('xs'));
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CreatePostFormState>();

  const onFormSubmit = handleSubmit((data: CreatePostFormState) => {
    console.log(data);
    onSubmit();
  });

  return (
    <Dialog
      fullScreen={shouldFullScreen}
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <Box component="form" noValidate onSubmit={onFormSubmit}>
        <DialogTitle>Create Post</DialogTitle>

        <DialogContent className={classes.createPostForm}>
          <Controller
            name="challengeId"
            control={control}
            rules={{ required: 'Please select a challenge' }}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                required
                fullWidth
                autoFocus
                variant="standard"
                label="Challenge"
                error={!!errors.challengeId}
                helperText={errors.challengeId?.message}
                select
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </TextField>
            )}
          />

          <Controller
            name="body"
            control={control}
            defaultValue=""
            rules={{ required: 'Post cannot be empty' }}
            render={({ field }) => (
              <TextField
                {...field}
                required
                fullWidth
                autoFocus
                variant="standard"
                label="Text"
                error={!!errors.body}
                helperText={errors.body?.message}
                multiline
                rows={5}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onClose} variant="outlined">
            Close
          </Button>

          <Button autoFocus variant="contained" type="submit">
            Post
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
