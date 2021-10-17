import React, { useEffect } from 'react';
import { Box, Grid, Stack, Theme, Typography } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import CircularProgressWithLabel from 'components/common/circularProgressWithLabel';

import './ChallengeSummaries.scss';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllChallenges, loadChallenge } from 'store/challenges/operations';
import { RootState } from 'store';
import { getChallenge, getChallengeList } from 'store/challenges/selectors';
import CategoryListItem from 'components/category/CategoryListItem';
import { Link } from 'react-router-dom';
import { CATEGORY_ROUTE } from 'routing/routes';
import { UserChallengeListData } from 'types/userchallenge';
import challenge from 'pages/challenge';

export interface ChallengeSummaryProps {
  id: number;
  percentage: number;
  label: string;
  remarks: string;
}

export interface ChallengeDetails {
  name: string;
  duration: number;
}

interface ChallengeSummariesProps {
  challenges: UserChallengeListData[];
}

const useStyles = makeStyles<Theme, ChallengeSummariesProps>((theme) =>
  createStyles({
    challengeSummary: {
      background: '#4068a3',
      borderRadius: '2em',
      padding: theme.spacing(3),
      marginBottom: theme.spacing(2),
      color: 'white',
    },
    challengeSummaryLabel: {
      fontWeight: theme.typography.fontWeightBold,
    },
  })
);

const ChallengeSummaries: React.FC<ChallengeSummariesProps> = (props) => {
  const { challenges } = props;
  // const classes = useStyles(props);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log(challenges);
  //   challenges.forEach((challenge) => {
  //     console.log('called');
  //     dispatch(loadChallenge(challenge.challengeId));
  //   });
  // }, [challenges]);

  useEffect(() => {
    dispatch(loadAllChallenges());
  });

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const allChallenges = useSelector((state: RootState) =>
    getChallengeList(state)
  )!;

  // const getChallengeName = (challengeId: number): string => {
  //   console.log(
  //     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  //     useSelector((state: RootState) => getChallenge(state, challengeId))!.name
  //   );
  //   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  //   return useSelector((state: RootState) => getChallenge(state, challengeId))!
  //     .name;
  // };

  // console.log(
  //   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  //   useSelector((state: RootState) => getChallenge(state, 3)).duration
  // );

  // console.log(
  //   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  //   useSelector((state: RootState) => getChallenge(state, 1))!.name
  // );

  // console.log(
  //   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  //   useSelector((state: RootState) => getChallenge(state, 1))!.name
  // );

  // var map = {};

  // challenges.forEach((challenge) => {
  //   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  //   const parentChallenge = useSelector((state: RootState) =>
  //     getChallenge(state, challenge.challengeId)
  //   );
  //   console.log(parentChallenge);
  // });
  // export const getHeadingFromCategory = (title: string): string => {
  //   switch (title) {
  //     case 'Hobbies':
  //       return 'learn a new hobby';
  //     case 'Exercise':
  //       return 'exercise more';
  //     case 'Habits':
  //       return 'pick up a habit';
  //     default:
  //       return 'invalid category';
  //   }
  // };

  // const ChallengeSummary = ({
  //   percentage,
  //   label,
  //   remarks,
  // }: ChallengeSummaryProps) => (
  //   <Grid container className={classes.challengeSummary}>
  //     <Stack direction="row" spacing={5} alignItems="center">
  //       <CircularProgressWithLabel variant="determinate" value={percentage} />

  //       <Stack direction="column" spacing={1} alignItems="flex-start">
  //         <Typography
  //           component="div"
  //           variant="h6"
  //           className={classes.challengeSummaryLabel}
  //         >
  //           {label}
  //         </Typography>
  //         <Typography component="div" variant="body1">
  //           {remarks}hi
  //         </Typography>
  //       </Stack>
  //     </Stack>
  //   </Grid>
  // );

  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="flex-start"
        justifyContent="center"
      >
        <Grid item xs={12}>
          <Typography component="div" variant="h5" className="section-heading">
            Ongoing challenges
          </Typography>
          <ul>
            {/* {challenges.map((challenge) => (
              <li key={challenge.challengeId}>
                <Link
                  to={{
                    pathname: `${CATEGORY_ROUTE}/1/${challenge.challengeId}`,
                    state: { challenge: challenge },
                  }}
                  style={{ textDecoration: 'none' }}
                >
                  <CategoryListItem
                    name={getChallengeName(challenge.challengeId)}
                    duration={
                      // // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                      // useSelector((state: RootState) =>
                      //   getChallenge(state, challenge.challengeId)
                      // )!.duration
                      10
                    }
                    percentageComplete={challenge.percentCompleted}
                  />
                </Link>
              </li>
            ))} */}
          </ul>
        </Grid>
      </Grid>
    </>
  );
};

export default ChallengeSummaries;
