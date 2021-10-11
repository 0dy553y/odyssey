import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import CategoryHeader from '../../components/category/CategoryHeader';
import CategoryListItem from '../../components/category/CategoryListItem';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from 'store';
import { getCategory } from 'store/categories/selectors';
import { getHeadingFromCategory } from 'utils/naming';

const ExplorePage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const category = useSelector((state: RootState) =>
    getCategory(state, Number(categoryId))
  )!;

  return (
    <Box>
      <CategoryHeader
        title={category.title}
        heading={getHeadingFromCategory(category.title)}
      />
      <CategoryListItem />
    </Box>
  );
};

export default ExplorePage;
