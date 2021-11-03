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
import { BADGE_ROUTE, EXPLORE_ROUTE } from '../../routing/routes';
import { useDispatch, useSelector } from 'react-redux';
import { getChallenge } from 'store/challenges/selectors';
import { loadChallenge } from 'store/challenges/operations';
import { RootState } from 'store';
import PrizeModelDisplay from 'components/common/prizeInfoDialog/PrizeModelDisplay';
import { getPrize, getPrizePath } from 'utils/prizes';

interface ChallengeCompletedDialogProps {
  challengeId: number;
  isOpen: boolean;
  onClose: () => void;
}

const useStyles = makeStyles(() => ({
  title: {
    textAlign: 'center',
  },
  challengeName: {
    textAlign: 'center',
    marginTop: '0.5em',
    marginBottom: '1em',
  },
  prizeHeader: {
    textAlign: 'center',
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
      ? getPrize(getPrizePath(challenge.prizeName), challenge.name)
      : getPrize('', '');

  return (
    <Suspense fallback="<div/>">
      <Dialog
        open={isOpen}
        onClose={onClose}
        fullWidth
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
        {challenge !== undefined ? (
          <DialogContent>
            <Typography variant="h4" className={classes.title}>
              Challenge Complete!
            </Typography>
            <Typography variant="body1" className={classes.challengeName}>
              {challenge.name}
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
              <Link onClick={() => history.push(BADGE_ROUTE)}>mementos</Link>.
              Head onto{' '}
              <Link onClick={() => history.push(EXPLORE_ROUTE)}>Explore</Link>{' '}
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
