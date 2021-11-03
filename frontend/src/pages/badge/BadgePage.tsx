import React, { useEffect, useReducer } from 'react';
import { ReactComponent as BackArrow } from 'assets/icons/arrow-left.svg';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllCompletedUserChallenges } from 'store/userchallenges/operations';
import { getAllCompletedUserChallenges } from 'store/userchallenges/selectors';
import { RootState } from 'store';
import PrizeDisplay from 'components/badge/PrizeDisplay';
import PrizeInfoModal from 'components/common/prizeInfoModal/PrizeInfoModal';
import { CompletedUserChallengeListData } from 'types/userchallenge';
import { getPrize } from 'utils/prizes';
import { Prize } from 'types/prize';

export interface PrizeWithChallengeName extends Prize {
  challengeName: string;
}

interface PrizeOpenState {
  isOpen: boolean;
  prize: PrizeWithChallengeName;
}

const BadgePage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { username } = useParams<{ username: string | undefined }>();

  const [prizeOpenState, setPrizeOpenState] = useReducer(
    (state: PrizeOpenState, newState: Partial<PrizeOpenState>) => ({
      ...state,
      ...newState,
    }),
    {
      isOpen: false,
      prize: {
        prizeName: '',
        prizePath: '',
        challengeName: '',
        prizeDescription: '',
      },
    }
  );

  const onPrizeOpen = (openedPrize: PrizeWithChallengeName) => {
    setPrizeOpenState({
      prize: openedPrize,
      isOpen: true,
    });
  };

  useEffect(() => {
    dispatch(loadAllCompletedUserChallenges(username));
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const completedChallenges = useSelector((state: RootState) =>
    getAllCompletedUserChallenges(state)
  )!;

  const prizes: PrizeWithChallengeName[] = completedChallenges.map(
    (challenge: CompletedUserChallengeListData) => {
      return {
        challengeName: challenge.challengeName,
        ...getPrize(challenge.prizeName, challenge.challengeName),
      };
    }
  );

  return (
    <Box sx={{ padding: '2em 1.5em 0 1.5em', height: '100%' }}>
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

      <Typography component="h1" variant="h4" style={{ fontFamily: 'Frock' }}>
        Mementos
      </Typography>

      <Box sx={{ height: '100%', marginTop: '1em' }}>
        {prizes.length === 0 && (
          <Typography variant="body1" className="no-results-message">
            Nothing here yet &#128584;
          </Typography>
        )}
        <PrizeDisplay
          prizes={prizes}
          onPrizeOpen={onPrizeOpen}
          showName={!prizeOpenState.isOpen}
        />
      </Box>
      <PrizeInfoModal
        isOpen={prizeOpenState.isOpen}
        onClose={() => {
          setPrizeOpenState({ isOpen: false });
        }}
        prize={prizeOpenState.prize}
      />
    </Box>
  );
};

export default BadgePage;
