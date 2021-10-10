import React from 'react';
import Box from '@mui/material/Box';
import Searchbar from '../../components/common/Searchbar';
import CategoryPreview from '../../components/explore/CategoryPreview';
import Typography from '@mui/material/Typography';

const ExplorePage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h3">Find your next challenge</Typography>
      <Searchbar />
      <Typography variant="h6">I want to...</Typography>
      <CategoryPreview />
      <CategoryPreview />
      <CategoryPreview />
    </Box>
  );
};

export default ExplorePage;
