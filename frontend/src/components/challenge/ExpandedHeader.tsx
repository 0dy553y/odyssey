import React from 'react';
import { makeStyles } from '@mui/styles';
import { Container } from '@mui/material';

const useStyles = makeStyles(() => ({
  headerContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '40px',
    position: 'relative',
    flex: '1 0 40px',
  },
  headerText: {
    textAlign: 'center',
    color: 'white',
    fontSize: '30px',
  },
}));

interface ExpandedHeaderProps {
  name: string;
}

const ExpandedHeader: React.FC<ExpandedHeaderProps> = (props) => {
  const classes = useStyles();
  const { name } = props;

  return (
    <div className={classes.headerContainer}>
      <div>
        <span>{name}</span>
      </div>
    </div>
  );
};

export default ExpandedHeader;
