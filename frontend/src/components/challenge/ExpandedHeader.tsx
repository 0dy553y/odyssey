import React from 'react';
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';
import { ChallengeData } from 'types/challenges';
import { UserChallengeData } from 'types/userchallenge';
import { getHexCode } from 'utils/color';

const useStyles = makeStyles(() => ({
  headerContainer: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  headerText: {
    color: 'white',
  },
  expandedHeaderTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'left',
    padding: '50px 50px 100px 50px',
  },
  white: {
    color: 'white',
  },
  bold: {
    fontWeight: 'bold',
  },
  topPadding: {
    paddingTop: '1.5em',
  },
  removeMargin: {
    marginBottom: '-0.5em',
  },
}));

interface ExpandedHeaderProps {
  challenge: ChallengeData;
  userChallenge: UserChallengeData | undefined;
}

const ExpandedHeader: React.FC<ExpandedHeaderProps> = (props) => {
  const classes = useStyles();
  const { challenge, userChallenge } = props;

  return (
    <div
      className={classes.headerContainer}
      style={{ backgroundColor: getHexCode(challenge.color) }}
    >
      <div className={classes.expandedHeaderTextContainer}>
        <Typography className={classes.white}>
          {!!userChallenge ? '🔥 ONGOING' : '👻 UNENROLLED'}
        </Typography>
        <Typography variant="h1" className={classes.headerText}>
          {challenge.name}
        </Typography>
        <Typography className={`${classes.white} ${classes.bold}`}>
          {challenge.duration} days · Created by {challenge.createdBy}
        </Typography>
        <Typography className={`${classes.white} ${classes.topPadding}`}>
          {challenge.description}
        </Typography>
        <Typography
          variant="h6"
          className={`${classes.white} ${classes.topPadding} ${classes.bold}`}
        >
          Recommended schedule
        </Typography>
        <Typography className={`${classes.white} ${classes.removeMargin}`}>
          {challenge.schedule}
        </Typography>
      </div>
    </div>
  );
};

export default ExpandedHeader;
