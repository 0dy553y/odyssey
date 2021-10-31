import React, { useEffect, useReducer } from 'react';
import { ReactComponent as BackArrow } from 'assets/icons/arrow-left.svg';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllCompletedUserChallenges } from 'store/userchallenges/operations';
import { getAllCompletedUserChallenges } from 'store/userchallenges/selectors';
import { RootState } from 'store';
import PrizeDisplay from 'components/badge/PrizeDisplay';
import PrizeInfoModal from 'components/badge/PrizeInfoModal';
import { CompletedUserChallengeListData } from 'types/userchallenge';
import { getPrize } from 'utils/prizes';
import { Prize } from 'types/prize';

interface PrizeOpenState {
  isOpen: boolean;
  prize: Prize;
}

const BadgePage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [prizeOpenState, setPrizeOpenState] = useReducer(
    (state: PrizeOpenState, newState: Partial<PrizeOpenState>) => ({
      ...state,
      ...newState,
    }),
    {
      isOpen: false,
      prize: { prizeName: '', prizePath: '', challengeName: '' },
    }
  );

  const onPrizeOpen = (openedPrize: Prize) => {
    setPrizeOpenState({
      prize: openedPrize,
      isOpen: true,
    });
  };

  useEffect(() => {
    dispatch(loadAllCompletedUserChallenges());
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const completedChallenges = useSelector((state: RootState) =>
    getAllCompletedUserChallenges(state)
  )!;

  const prizes: Prize[] = completedChallenges.map(
    (challenge: CompletedUserChallengeListData) => {
      return getPrize(challenge.challengeName);
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
        Badges
      </Typography>
      <Box sx={{ height: '100%' }}>
        <PrizeDisplay prizes={prizes} onPrizeOpen={onPrizeOpen} />
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
