import React, { useEffect, Suspense } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, useTheme } from '@mui/styles';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Link,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/CloseRounded';
import { MEMENTOS_ROUTE, EXPLORE_ROUTE } from '../../routing/routes';
import { useDispatch, useSelector } from 'react-redux';
import { getChallenge } from 'store/challenges/selectors';
import { loadChallenge } from 'store/challenges/operations';
import { RootState } from 'store';
import PrizeModelDisplay from 'components/common/prizeInfoDialog/PrizeModelDisplay';
import { getPrize } from 'utils/prizes';

interface ChallengeCompletedDialogProps {
  challengeId: number;
  isOpen: boolean;
  onClose: () => void;
}

const useStyles = makeStyles(() => ({
  title: {
    textAlign: 'center',
    fontSize: '24px',
  },
  challengeName: {
    textAlign: 'center',
    marginTop: '0.5em',
    marginBottom: '1em',
  },
  prizeHeader: {
    textAlign: 'center',
    fontSize: '18px',
  },
  prizeSubtitle: {
    textAlign: 'center',
    color: 'gray',
    fontSize: '0.9em',
    marginBottom: '1em',
  },
  body: {
    textAlign: 'center',
  },
  handCursor: {
    cursor: 'pointer',
  },
}));

const ChallengeCompletedDialog: React.FC<ChallengeCompletedDialogProps> = ({
  challengeId,
  isOpen,
  onClose,
}) => {
  const theme = useTheme();
  const history = useHistory();
  const classes = useStyles(theme);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadChallenge(challengeId));
  }, [challengeId]);

  const challenge = useSelector((state: RootState) =>
    getChallenge(state, Number(challengeId))
  );

  const prize =
    challenge !== undefined
      ? getPrize(challenge.prizeName, challenge.name)
      : getPrize('', '');

  return (
    <Suspense fallback="<div/>">
      <Dialog
        open={isOpen}
        onClose={onClose}
        fullWidth
        PaperProps={{
          style: {
            borderRadius: '1.5em',
            paddingTop: '1em',
            paddingBottom: '1em',
          },
        }}
      >
        <DialogActions
          sx={{
            marginBottom: '-2em',
            marginTop: '-0.5em',
          }}
        >
          <IconButton onClick={onClose}>
            <CloseIcon width="1.5em" />
          </IconButton>
        </DialogActions>
        {challenge !== undefined ? (
          <DialogContent>
            <Typography variant="h5" className={classes.title}>
              {challenge.name} Challenge Complete!
            </Typography>
            <Box sx={{ marginTop: '1em', height: '8em' }}>
              <PrizeModelDisplay prizePath={prize.prizePath} />
            </Box>
            <Typography variant="h5" className={classes.prizeHeader}>
              {prize.prizeName}
            </Typography>
            <Typography variant="body1" className={classes.prizeSubtitle}>
              {prize.prizeDescription}
            </Typography>
            <Typography
              component="div"
              variant="body1"
              className={classes.body}
            >
              has been added to{' '}
              <Link
                className={classes.handCursor}
                onClick={() => history.push(MEMENTOS_ROUTE)}
              >
                mementos
              </Link>
              . Head onto{' '}
              <Link
                className={classes.handCursor}
                onClick={() => history.push(EXPLORE_ROUTE)}
              >
                Explore
              </Link>{' '}
              to embark on your next odyssey!
            </Typography>
          </DialogContent>
        ) : (
          <></>
        )}
      </Dialog>
    </Suspense>
  );
};

export default ChallengeCompletedDialog;
