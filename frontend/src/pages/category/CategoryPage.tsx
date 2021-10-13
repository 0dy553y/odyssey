import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import CategoryHeader from '../../components/category/CategoryHeader';
import CategoryListItem from '../../components/category/CategoryListItem';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { RootState } from 'store';
import { getCategory } from 'store/categories/selectors';
import { loadAllChallenges } from 'store/challenges/operations';
import { getChallengeList } from 'store/challenges/selectors';
import { getHeadingFromCategory } from 'utils/naming';
import { CATEGORY_ROUTE } from '../../routing/routes';

const ExplorePage: React.FC = () => {
  const dispatch = useDispatch();
  const { categoryId } = useParams<{ categoryId: string }>();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const category = useSelector((state: RootState) =>
    getCategory(state, Number(categoryId))
  )!;

  useEffect(() => {
    dispatch(loadAllChallenges());
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const challenges = useSelector((state: RootState) =>
    getChallengeList(state)
  )!;

  if (!category) {
    return <Skeleton />;
  }

  return (
    <Box>
      <CategoryHeader
        title={category.title}
        heading={getHeadingFromCategory(category.title)}
      />
      <ul>
        {challenges.map((challenge) => (
          <li key={challenge.id}>
            <Link
              to={{
                pathname: `${CATEGORY_ROUTE}/${category.id}/${challenge.id}`,
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
        ))}
      </ul>
    </Box>
  );
};

export default ExplorePage;
