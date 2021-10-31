import React, { useEffect } from 'react';
import { ReactComponent as BackArrow } from 'assets/icons/arrow-left.svg';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllCompletedUserChallenges } from 'store/userchallenges/operations';
import { getAllCompletedUserChallenges } from 'store/userchallenges/selectors';
import { RootState } from 'store';
import PrizeDisplay from 'components/badge/PrizeDisplay';
import { CompletedUserChallengeListData } from 'types/userchallenge';
import { getPrizePath } from 'utils/prizes';

const BadgePage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllCompletedUserChallenges());
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const completedChallenges = useSelector((state: RootState) =>
    getAllCompletedUserChallenges(state)
  )!;

  const prizes: string[] = completedChallenges.map(
    (challenge: CompletedUserChallengeListData) => {
      return getPrizePath(challenge.challengeName);
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
        <PrizeDisplay prizes={prizes} />
      </Box>
    </Box>
  );
};

export default BadgePage;
