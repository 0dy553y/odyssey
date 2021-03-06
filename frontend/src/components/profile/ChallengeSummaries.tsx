import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllChallenges } from 'store/challenges/operations';
import { RootState } from 'store';
import { getChallengeList } from 'store/challenges/selectors';
import CategoryListItem from 'components/category/CategoryListItem';
import { useHistory } from 'react-router-dom';
import { CHALLENGE_ROUTE } from 'routing/routes';
import { UserChallengeListData } from 'types/userchallenge';
import { ChallengeListData } from 'types/challenges';

import './ChallengeSummaries.scss';

interface ChallengeSummariesProps {
  challenges: UserChallengeListData[];
  isCurrentUser: boolean;
}

const ChallengeSummaries: React.FC<ChallengeSummariesProps> = (props) => {
  const { challenges, isCurrentUser } = props;

  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(loadAllChallenges());
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const parentChallenges = useSelector((state: RootState) =>
    getChallengeList(state)
  )!;

  const getChallengeDetails = (challengeId: number): ChallengeListData => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return parentChallenges.find((challenge) => challenge.id === challengeId)!;
  };

  return (
    <>
      <Typography component="div" variant="h5">
        Ongoing challenges
      </Typography>
      <ul>
        {challenges.length === 0 && (
          <Typography variant="body1" className="no-results-message">
            {isCurrentUser
              ? 'Join a challenge? 💃'
              : 'No challenges to display'}
          </Typography>
        )}
        {challenges.length > 0 &&
          challenges.map(function (challenge) {
            const challengeDetails = getChallengeDetails(challenge.challengeId);
            if (challengeDetails !== undefined) {
              return (
                <li key={challenge.challengeId}>
                  <CategoryListItem
                    name={challengeDetails.name}
                    duration={challengeDetails.duration}
                    percentageComplete={challenge.percentCompleted}
                    onClick={() =>
                      history.push(
                        `${CHALLENGE_ROUTE}/${challenge.challengeId}`,
                        { challenge: challenge }
                      )
                    }
                  />
                </li>
              );
            }
          })}
      </ul>
    </>
  );
};

export default ChallengeSummaries;
