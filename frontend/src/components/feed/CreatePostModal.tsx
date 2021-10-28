import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  useTheme,
  TextField,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { makeStyles } from '@mui/styles';
import { ChallengeListData } from 'types/challenges';

import './ReactionChip.scss';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreatePostFormState) => void;
  challenges: ChallengeListData[];
}

interface CreatePostFormState {
  challengeId: number | string | null;
  body: string;
}

const useStyles = makeStyles(() => ({
  createPostForm: {
    '&>:not(:last-child)': {
      marginBottom: '1em',
    },
  },
}));

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onSubmit,
  challenges,
  ...props
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<CreatePostFormState>({
    defaultValues: {
      challengeId: '',
      body: '',
    },
  });

  const onClose = () => {
    reset();
    props.onClose();
  };

  const dialogContent = () => {
    if (challenges.length === 0) {
      return (
        <Box>
          You are not enrolled in any challenges. Join a challenge first before
          sharing your experiences!
        </Box>
      );
    }

    return (
      <>
        <Controller
          name="challengeId"
          control={control}
          rules={{ required: 'Please select a challenge' }}
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
              {challenges.map((challenge) => (
                <MenuItem key={challenge.id} value={challenge.id}>
                  {challenge.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Controller
          name="body"
          control={control}
          rules={{ required: 'Text cannot be empty' }}
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
      </>
    );
  };

  return (
    <Dialog
      open={isOpen}
      onClose={(_, reason: 'backdropClick' | 'escapeKeyDown') => {
        if (reason === 'backdropClick') {
          return;
        }
        reset();
        onClose();
      }}
      fullWidth
      maxWidth="sm"
    >
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit((data: CreatePostFormState) => {
          onSubmit(data);
          reset();
        })}
      >
        <DialogTitle>Create Post</DialogTitle>

        <DialogContent className={classes.createPostForm}>
          {dialogContent()}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onClose} variant="outlined">
            Close
          </Button>

          <Button
            autoFocus
            variant="contained"
            type="submit"
            disabled={challenges.length === 0}
          >
            Post
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
