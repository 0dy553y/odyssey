import React from 'react';
import { ListItem, ListItemAvatar, Skeleton, Grid } from '@mui/material';

export const FeedPostSkeleton: React.FC = ({}) => {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Skeleton variant="circular" width={40} height={40} />
      </ListItemAvatar>
      <Grid container alignItems="center">
        <Grid item xs={12}>
          <Skeleton variant="text" />
        </Grid>

        <Grid item xs={12}>
          <Skeleton variant="rectangular" height={80} />
        </Grid>
      </Grid>
    </ListItem>
  );
};
