import React from 'react';
import Box from '@mui/material/Box';
import CategoryHeader from '../../components/category/CategoryHeader';
import CategoryListItem from '../../components/category/CategoryListItem';
// import { useLocation, Link } from "react-router-dom";

const ExplorePage: React.FC = () => {
  return (
    <Box>
      <CategoryHeader />
      <CategoryListItem />
    </Box>
  );
};

export default ExplorePage;
