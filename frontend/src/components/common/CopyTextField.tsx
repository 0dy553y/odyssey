import React from 'react';
import { IconButton, InputBase, Paper, Theme } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { addSnackbar } from '../../store/snackbars/actions';

interface Props {
  text: string;
  textDescription: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#FAF9F6',
    borderRadius: '10px',
  },
  icon: {
    padding: '10px',
    color: 'white',
    marginLeft: '2px',
    marginRight: '2px',
  },
  iconContainer: {
    marginLeft: '5px',
    backgroundColor: theme.palette.primary.main,
    borderTopRightRadius: '10px',
    borderBottomRightRadius: '10px',
  },
}));

const CopyTextField: React.FC<Props> = ({ text, textDescription }: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Paper component="form" className={classes.container}>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        value={text}
        inputProps={{ readOnly: true }}
      />
      <div className={classes.iconContainer}>
        <IconButton
          className={classes.icon}
          onClick={() => {
            navigator.clipboard.writeText(text).then(() =>
              dispatch(
                addSnackbar({
                  message: `Successfully copied ${textDescription} to clipboard!`,
                  variant: 'success',
                })
              )
            );
          }}
        >
          <ContentCopyIcon />
        </IconButton>
      </div>
    </Paper>
  );
};

export default CopyTextField;
