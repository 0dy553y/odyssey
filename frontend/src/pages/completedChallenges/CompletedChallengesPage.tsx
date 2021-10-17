import React, { useEffect } from 'react';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllCompletedUserChallenges } from 'store/userchallenges/operations';
import { Link, useHistory } from 'react-router-dom';
import { loadAllChallenges } from 'store/challenges/operations';
import { getAllCompletedUserChallenges } from 'store/userchallenges/selectors';
import { RootState } from 'store';
import { getChallengeList } from 'store/challenges/selectors';
import { CATEGORY_ROUTE } from 'routing/routes';
import CompletedChallengeListItem from 'components/completedChallenges/CompletedChallengeListItem';
import { ChallengeListData } from 'types/challenges';

import './CompletedChallengesPage.scss';
import { convertTimestampToHumanReadableFormat } from 'utils/formatting';

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

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const parentChallenges = useSelector((state: RootState) =>
    getChallengeList(state)
  )!;

  const getChallengeDetails = (challengeId: number): ChallengeListData => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return parentChallenges.find((challenge) => challenge.id === challengeId)!;
  };

  return (
    <Box sx={{ padding: '2em 1.5em 0 1.5em' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" onClick={() => history.goBack()}>
            <ChevronLeft />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Typography
        component="h1"
        variant="h4"
        className="header"
        style={{ fontFamily: 'Frock' }}
      >
        Your completed challenges
      </Typography>
      <ul>
        {completedChallenges.length === 0 && (
          <Typography variant="body1" className="no-results-message">
            Nothing here yet &#128584;
          </Typography>
        )}
        {completedChallenges.length > 0 &&
          completedChallenges.map(function (challenge) {
            const challengeDetails = getChallengeDetails(challenge.challengeId);
            if (challengeDetails !== undefined) {
              return (
                <li key={challenge.challengeId}>
                  <Link
                    to={{
                      pathname: `${CATEGORY_ROUTE}/1/${challenge.challengeId}`,
                      state: { challenge: challenge },
                    }}
                    style={{ textDecoration: 'none' }}
                  >
                    <CompletedChallengeListItem
                      name={challengeDetails.name}
                      completionDate={convertTimestampToHumanReadableFormat(
                        challenge.completedAt
                      )}
                    />
                  </Link>
                </li>
              );
            }
          })}
      </ul>
    </Box>
  );
};

export default CompletedChallengesPage;
