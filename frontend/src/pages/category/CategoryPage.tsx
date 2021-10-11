import React from 'react';
import Box from '@mui/material/Box';
import CategoryHeader from '../../components/category/CategoryHeader';
import CategoryListItem from '../../components/category/CategoryListItem';
import { useParams } from 'react-router-dom';

const ExplorePage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  console.log(categoryId);

  return (
    <Box>
      <CategoryHeader />
      <CategoryListItem />
    </Box>
  );
};

export default ExplorePage;
