import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllChallenges } from 'store/challenges/operations';
import { RootState } from 'store';
import { getChallengeList } from 'store/challenges/selectors';
import CategoryListItem from 'components/category/CategoryListItem';
import { Link } from 'react-router-dom';
import { CATEGORY_ROUTE } from 'routing/routes';
import { UserChallengeListData } from 'types/userchallenge';
import { ChallengeListData } from 'types/challenges';

import './ChallengeSummaries.scss';

export interface ChallengeDetails {
  name: string;
  duration: number;
}

interface ChallengeSummariesProps {
  challenges: UserChallengeListData[];
}

const ChallengeSummaries: React.FC<ChallengeSummariesProps> = (props) => {
  const { challenges } = props;

  const dispatch = useDispatch();
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
      <Typography component="div" variant="h5" className="section-heading">
        Ongoing challenges
      </Typography>
      <ul>
        {challenges.length === 0 && (
          <Typography variant="body1" className="no-results-message">
            Join a challenge? &#128131;
          </Typography>
        )}
        {challenges.length > 0 &&
          challenges.map(function (challenge) {
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
                    <CategoryListItem
                      name={challengeDetails.name}
                      duration={challengeDetails.duration}
                      percentageComplete={challenge.percentCompleted}
                    />
                  </Link>
                </li>
              );
            }
          })}
      </ul>
    </>
  );
};

export default ChallengeSummaries;