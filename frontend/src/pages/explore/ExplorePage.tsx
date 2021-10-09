import React from 'react';
import Box from '@mui/material/Box';
import Searchbar from '../../components/common/Searchbar';
import CategoryPreview from '../../components/explore/CategoryPreview';

const ExplorePage: React.FC = () => {
  return (
    <Box>
      <h1>Find your next challenge</h1>
      <Searchbar />
      <div>I want to...</div>
      <CategoryPreview />
    </Box>
  );
};

export default ExplorePage;
