import React from 'react';
import { makeStyles } from '@mui/styles';
import { ChallengeColor } from 'types/challenges';
import { getHexCode } from 'utils/color';

const useStyles = makeStyles(() => ({
  headerContainer: {
    height: '4em',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    verticalAlign: 'middle',
    padding: '10px',
  },
  headerText: {
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
    textAlign: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '1.3em',
    fontFamily: 'Frock',
  },
}));

interface CollapsedHeaderProps {
  name: string;
  color: ChallengeColor;
}

const CollapsedHeader: React.FC<CollapsedHeaderProps> = (props) => {
  const classes = useStyles();
  const { name, color } = props;

  return (
    <div
      className={classes.headerContainer}
      style={{ backgroundColor: getHexCode(color) }}
    >
      <span className={classes.headerText}>{name}</span>
    </div>
  );
};

export default CollapsedHeader;
