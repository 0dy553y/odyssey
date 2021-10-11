import React from 'react';
import Box from '@mui/material/Box';
import Searchbar from '../../components/common/Searchbar';
import CategoryPreview from '../../components/explore/CategoryPreview';
import Typography from '@mui/material/Typography';
import { getCategoryList } from 'store/categories/selectors';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { CATEGORY_ROUTE } from '../../routing/routes';
import './ExplorePage.css';
import { BrowserRouter as Route, Link } from 'react-router-dom';

function getHeadingFromCategory(title: string): string {
  switch (title) {
    case 'Hobbies':
      return 'learn a new hobby';
    case 'Exercise':
      return 'exercise more';
    case 'Habits':
      return 'pick up a habit';
    default:
      return 'invalid category';
  }
}

const ExplorePage: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const categories = useSelector((state: RootState) => getCategoryList(state))!;

  return (
    <Box>
      <Typography variant="h3">Find your next challenge</Typography>
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
