import React from 'react';
import Box from '@mui/material/Box';
import Searchbar from '../../components/common/Searchbar';
import CategoryPreview from '../../components/explore/CategoryPreview';
import Typography from '@mui/material/Typography';
import { getCategoryList } from 'store/categories/selectors';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Link } from 'react-router-dom';
import { getHeadingFromCategory } from 'utils/naming';
import { CATEGORY_ROUTE } from '../../routing/routes';
import './ExplorePage.scss';

const ExplorePage: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const categories = useSelector((state: RootState) => getCategoryList(state))!;

  return (
    <Box>
      <Typography variant="h2">Find your next challenge</Typography>
      <Searchbar />
      <Typography variant="h6">I want to...</Typography>
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
    </Box>
  );
};

export default ExplorePage;
