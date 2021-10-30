import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Searchbar from '../../components/common/Searchbar';
import CategoryPreview from '../../components/explore/CategoryPreview';
import Typography from '@mui/material/Typography';
import { getCategoryList } from 'store/categories/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { Link } from 'react-router-dom';
import { getHeadingFromCategory } from 'utils/naming';
import { CATEGORY_ROUTE, CHALLENGE_ROUTE } from '../../routing/routes';
import CategoryListItem from '../../components/category/CategoryListItem';
import { loadAllChallenges } from 'store/challenges/operations';
import { getChallengeList } from 'store/challenges/selectors';

import './ExplorePage.scss';
import {
  loadAllCompletedUserChallenges,
  loadAllOngoingUserChallenges,
} from 'store/userchallenges/operations';
import {
  getAllCompletedUserChallenges,
  getAllOngoingUserChallenges,
} from 'store/userchallenges/selectors';
import { getChallengePercentageComplete } from 'utils/progress';

const ExplorePage: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const categories = useSelector((state: RootState) => getCategoryList(state))!;

  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(loadAllChallenges());
    dispatch(loadAllOngoingUserChallenges());
    dispatch(loadAllCompletedUserChallenges());
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const challenges = useSelector((state: RootState) =>
    getChallengeList(state)
  )!;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const ongoingChallenges = useSelector((state: RootState) =>
    getAllOngoingUserChallenges(state)
  )!;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const completedChallenges = useSelector((state: RootState) =>
    getAllCompletedUserChallenges(state)
  )!;

  const eventhandler = (data: string) => {
    setSearchQuery(data);
  };

  const getFilteredChallenges = () => {
    return challenges
      .filter((challenge) =>
        challenge.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map((challenge) => (
        <li key={challenge.id}>
          <Link
            to={{
              pathname: `${CHALLENGE_ROUTE}/${challenge.id}`,
              state: { challenge: challenge },
            }}
            style={{ textDecoration: 'none' }}
          >
            <CategoryListItem
              name={challenge.name}
              duration={challenge.duration}
              percentageComplete={getChallengePercentageComplete(
                challenge.id,
                completedChallenges,
                ongoingChallenges
              )}
            />
          </Link>
        </li>
      ));
  };

  return (
    <Box sx={{ padding: '3em 1.5em 0 1.5em' }}>
      <Typography variant="h1">Find your next challenge</Typography>
      <Searchbar
        placeholder="Search by challenge name..."
        onChange={eventhandler}
      />
      {searchQuery.length > 0 &&
        (getFilteredChallenges().length > 0 ? (
          <ul>{getFilteredChallenges()}</ul>
        ) : (
          <Typography variant="body1" style={{ textAlign: 'center' }}>
            No results found &#128123;
          </Typography>
        ))}
      {searchQuery.length == 0 && (
        <>
          <Typography
            variant="h6"
            sx={{ fontStyle: 'italic', paddingBottom: '1em' }}
          >
            I want to...
          </Typography>
          <ul>
            {categories.map((category) => (
              <li key={category.id}>
                <Link to={`${CATEGORY_ROUTE}/${category.id}`}>
                  <CategoryPreview
                    title={category.title}
                    heading={getHeadingFromCategory(category.title)}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </Box>
  );
};

export default ExplorePage;
