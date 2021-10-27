import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  headerContainer: {
    height: '3em',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
  },
  headerText: {
    textAlign: 'center',
    color: 'white',
    fontSize: '1.3em',
    fontFamily: 'Frock',
  },
}));

interface CollapsedHeaderProps {
  name: string;
}

const CollapsedHeader: React.FC<CollapsedHeaderProps> = (props) => {
  const classes = useStyles();
  const { name } = props;

  return (
    <div className={classes.headerContainer}>
      <span className={classes.headerText}>{name}</span>
    </div>
  );
};

export default CollapsedHeader;
