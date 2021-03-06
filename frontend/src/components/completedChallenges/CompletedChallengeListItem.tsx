import React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography, Theme } from '@mui/material';
import { displayDateWithTimestamp } from 'utils/formatting';
import Avatar from 'boring-avatars';

import './CompletedChallengeListItem.scss';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 0 2em 0',
  },
  fillIcon: {
    fill: theme.palette.primary.main,
  },
}));

interface CategoryListProps {
  name: string;
  completionDate: Date;
}

const CategoryListItem: React.FC<CategoryListProps> = (props) => {
  const classes = useStyles();
  const { name, completionDate } = props;

  return (
    <Box>
      <div>
        <div className={classes.container}>
          <div className="square">
            <Avatar
              square={true}
              variant={'beam'}
              size={65}
              name={name}
              colors={[
                '#B17B9C',
                '#CC871F',
                '#3CA195',
                '#2B2A5E',
                '#9F88E3',
                '#3836A6',
              ]}
            />
          </div>
          <Grid item xs={9}>
            <Typography component="div" variant="h6">
              {name}
            </Typography>
            <Typography component="div" variant="body1">
              Completed at: {displayDateWithTimestamp(completionDate)}
            </Typography>
          </Grid>
        </div>
      </div>
    </Box>
  );
};

export default CategoryListItem;
