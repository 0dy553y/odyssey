import React, { useEffect } from 'react';
import { ReactComponent as BackArrow } from 'assets/icons/arrow-left.svg';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { batch, useDispatch, useSelector } from 'react-redux';
import { loadAllCompletedUserChallenges } from 'store/userchallenges/operations';
import { Link, useHistory, useParams } from 'react-router-dom';
import { loadAllChallenges } from 'store/challenges/operations';
import { getAllCompletedUserChallenges } from 'store/userchallenges/selectors';
import { RootState } from 'store';
import { getChallengeList } from 'store/challenges/selectors';
import { CHALLENGE_ROUTE } from 'routing/routes';
import CompletedChallengeListItem from 'components/completedChallenges/CompletedChallengeListItem';
import { ChallengeListData } from 'types/challenges';

import './CompletedChallengesPage.scss';
import { getUser } from '../../store/auth/selectors';
import { getUserByUsername } from '../../store/users/selectors';
import { displayUsername } from '../../utils/formatting';
import { loadUser } from '../../store/users/operations';

const CompletedChallengesPage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { username } = useParams<{ username: string | undefined }>();

  const isOwnCompletedChallengesPage = username === undefined;
  const user = isOwnCompletedChallengesPage
    ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      useSelector(getUser)!
    : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      useSelector((state: RootState) => getUserByUsername(state, username!))!;

  useEffect(() => {
    batch(() => {
      dispatch(loadUser(username));
      dispatch(loadAllCompletedUserChallenges(username));
      dispatch(loadAllChallenges());
    });
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

  if (!user) {
    return <></>;
  }

  return (
    <Box className="completed-challenges" sx={{ padding: '2em 1.5em 0 1.5em' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className="back-arrow"
            edge="start"
            onClick={() => history.goBack()}
          >
            <BackArrow filter="invert(1)" height="1.5em" width="1.5em" />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Typography
        component="h1"
        variant="h4"
        className="header"
        style={{ fontFamily: 'Frock' }}
      >
        {isOwnCompletedChallengesPage
          ? 'Your completed challenges'
          : `${
              user.displayName ?? displayUsername(user.username)
            }'s completed challenges`}
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
                      pathname: `${CHALLENGE_ROUTE}/${challenge.challengeId}`,
                      state: { challenge: challenge },
                    }}
                    style={{ textDecoration: 'none' }}
                  >
                    <CompletedChallengeListItem
                      name={challengeDetails.name}
                      completionDate={challenge.completedAt}
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
