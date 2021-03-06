import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  DialogActions,
} from '@mui/material';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';
import CloseIcon from '@mui/icons-material/CloseRounded';
import { ChallengeData } from '../../types/challenges';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import CopyTextField from '../common/CopyTextField';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  challenge: ChallengeData;
}

const useStyles = makeStyles(() => ({
  shareContainer: {
    marginTop: '20px',
    display: 'grid',
    gridAutoFlow: 'column',
    gridColumnGap: '10px',
  },
  modalHeader: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
}));

const ShareDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  challenge,
}: Props) => {
  const classes = useStyles();
  const location = useLocation();

  const url = window.env.BASE_CLIENT_URL + location.pathname;
  const shortMessage = `Come join me in the ${challenge.name} challenge!`;
  const message = `Come join me in the ${challenge.name} challenge!\n\n${challenge.description}`;
  const hashtag = '#odysseyapp';
  const iconSize = 32;
  const isIconRound = true;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        style: { borderRadius: '1.5em', padding: '1em' },
      }}
    >
      <DialogActions
        sx={{
          marginBottom: '-3em',
          marginTop: '-0.5em',
        }}
      >
        <IconButton onClick={onClose}>
          <CloseIcon width="1.5em" />
        </IconButton>
      </DialogActions>
      <DialogTitle className={classes.modalHeader}>
        Invite your friends!
      </DialogTitle>
      <DialogContent>
        <CopyTextField text={url} textDescription="challenge link" />
        <div className={classes.shareContainer}>
          <FacebookShareButton url={url} quote={message} hashtag={hashtag}>
            <FacebookIcon size={iconSize} round={isIconRound} />
          </FacebookShareButton>
          <TwitterShareButton
            url={url}
            title={shortMessage}
            hashtags={[hashtag]}
          >
            <TwitterIcon size={iconSize} round={isIconRound} />
          </TwitterShareButton>
          <TelegramShareButton url={url} title={shortMessage}>
            <TelegramIcon size={iconSize} round={isIconRound} />
          </TelegramShareButton>
          <WhatsappShareButton url={url} title={shortMessage}>
            <WhatsappIcon size={iconSize} round={isIconRound} />
          </WhatsappShareButton>
          <EmailShareButton
            url={url}
            subject={`[Odyssey App] Invitation to Join the ${challenge.name} Challenge`}
            body={message}
          >
            <EmailIcon size={iconSize} round={isIconRound} />
          </EmailShareButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
