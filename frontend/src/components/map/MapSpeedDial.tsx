import React, { useEffect, useState } from 'react';
import { IconButton, SpeedDial, SpeedDialAction } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { getAllOngoingUserChallenges } from 'store/userchallenges/selectors';
import { UserChallengeListData } from 'types/userchallenge';
import { loadAllOngoingUserChallenges } from 'store/userchallenges/operations';
import MapIcon from '@mui/icons-material/Map';
import MapDialIcon from './MapDialIcon';
import { useHistory } from 'react-router-dom';
import { MAP_ROUTE } from 'routing/routes';

const useStyles = makeStyles(() => ({
  staticTooltipLabel: {
    whiteSpace: 'nowrap',
    maxWidth: 'none',
  },
}));

const MapSpeedDial: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => {
    dispatch(loadAllOngoingUserChallenges());
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const ongoingChallenges = useSelector((state: RootState) =>
    getAllOngoingUserChallenges(state)
  )!;

  // Don't show speed dial if don't have multiple ongoing challenges.
  if (ongoingChallenges.length <= 1) return <></>;

  return (
    <SpeedDial
      ariaLabel="mapSpeedDial"
      sx={{ position: 'absolute', bottom: '2em', right: '2em' }}
      icon={<MapIcon />}
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      open={isOpen}
    >
      {ongoingChallenges?.map((challenge: UserChallengeListData) => (
        <SpeedDialAction
          key={challenge.challengeId}
          icon={<MapDialIcon prizeName={challenge.prizeName} />}
          tooltipTitle={challenge.challengeName}
          tooltipOpen
          onClick={() => {
            history.replace(`${MAP_ROUTE}/${challenge.challengeId}`);
            setIsOpen(false);
          }}
          classes={{ staticTooltipLabel: classes.staticTooltipLabel }}
        />
      ))}
    </SpeedDial>
  );
};

export default MapSpeedDial;
