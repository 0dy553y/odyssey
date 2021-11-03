import React, { useEffect, Suspense } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, useTheme } from '@mui/styles';
import {
  Backdrop,
  Box,
  Fade,
  Modal,
  Link,
  Theme,
  Typography,
} from '@mui/material';
import {
  BADGE_ROUTE,
  EXPLORE_ROUTE,
  PROFILE_ROUTE,
} from '../../routing/routes';
import { useDispatch, useSelector } from 'react-redux';
import { getChallenge } from 'store/challenges/selectors';
import { loadChallenge } from 'store/challenges/operations';
import { RootState } from 'store';
import { ChallengeData } from 'types/challenges';
import PrizeModelDisplay from 'components/common/prizeInfoModal/PrizeModelDisplay';
import { getPrize, getPrizePath } from 'utils/prizes';

interface ChallengeCompletedModalProps {
  challengeId: number;
  isOpen: boolean;
  onClose: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    padding: '0.6em',
    '&>:not(:last-child)': {
      marginBottom: '0.3em',
    },
    [theme.breakpoints.only('xs')]: {
      width: '90vw',
    },
    [theme.breakpoints.up('sm')]: {
      width: '400px',
    },
  },
  title: {
    textAlign: 'center',
  },
  completedText: {
    textAlign: 'center',
  },
  prizeHeader: {
    textAlign: 'center',
  },
  prizeSubtitle: {
    textAlign: 'center',
    color: 'gray',
    fontSize: '0.9em',
  },
}));

const ChallengeCompletedModal: React.FC<ChallengeCompletedModalProps> = ({
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

  const prize = getPrize(getPrizePath(challenge.prizeName), challenge.name);

  return (
    <Suspense fallback="<div/>">
      <Modal
        open={isOpen}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <Box className={classes.modal}>
            <Typography variant="h4" className={classes.title}>
              Congratulations!
            </Typography>
            <Typography variant="body1" className={classes.completedText}>
              Completed - {challenge.name}
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
            <Typography component="div" variant="body1">
              has been added to your
              <Link onClick={() => history.push(BADGE_ROUTE)}>mementos</Link>.
            </Typography>
            <Typography component="div" variant="body1">
              Head onto
              <Link onClick={() => history.push(EXPLORE_ROUTE)}> Explore </Link>
              to embark on your next odyssey!
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </Suspense>
  );
};

export default ChallengeCompletedModal;
