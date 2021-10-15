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
import { CATEGORY_ROUTE } from '../../routing/routes';
import CategoryListItem from '../../components/category/CategoryListItem';
import { loadAllChallenges } from 'store/challenges/operations';
import { getChallengeList } from 'store/challenges/selectors';

import './ExplorePage.scss';

const ExplorePage: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const categories = useSelector((state: RootState) => getCategoryList(state))!;

  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(loadAllChallenges());
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const challenges = useSelector((state: RootState) =>
    getChallengeList(state)
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
              pathname: `${CATEGORY_ROUTE}/${challenge.categoryId}/${challenge.id}`,
              state: { challenge: challenge },
            }}
            style={{ textDecoration: 'none' }}
          >
            <CategoryListItem
              name={challenge.name}
              duration={challenge.duration}
            />
          </Link>
        </li>
      ));
  };

  return (
    <Box sx={{ padding: '2em 1.5em 0 1.5em' }}>
      <Typography variant="h2">Find your next challenge</Typography>
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
          <Typography variant="h6" sx={{ fontStyle: 'italic' }}>
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
