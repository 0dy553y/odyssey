import React, { useEffect } from 'react';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllCompletedUserChallenges } from 'store/userchallenges/operations';
import { useHistory } from 'react-router-dom';
import { loadAllChallenges } from 'store/challenges/operations';
import { getAllCompletedUserChallenges } from 'store/userchallenges/selectors';
import { RootState } from 'store';
import { getChallengeList } from 'store/challenges/selectors';

const CompletedChallengesPage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(loadAllCompletedUserChallenges());
    dispatch(loadAllChallenges());
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const completedChallenges = useSelector((state: RootState) =>
    getAllCompletedUserChallenges(state)
  )!;

  console.log(completedChallenges);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const parentChallenges = useSelector((state: RootState) =>
    getChallengeList(state)
  )!;

  return (
    <Box sx={{ padding: '2em 1.5em 0 1.5em' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" onClick={() => history.goBack()}>
            <ChevronLeft />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Typography component="h1" variant="h4" style={{ fontFamily: 'Frock' }}>
        Your completed challenges
      </Typography>
    </Box>
  );
};

export default CompletedChallengesPage;
