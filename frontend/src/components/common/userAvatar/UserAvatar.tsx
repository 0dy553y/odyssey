import * as React from 'react';
import { Avatar } from '@mui/material';
import { DataUrl } from 'types/auth';
import { stringAvatar } from 'utils/avatar';
import { useHistory } from 'react-router-dom';
import { PROFILE_ROUTE } from 'routing/routes';
import { getUser } from 'store/auth/selectors';
import { useSelector } from 'react-redux';
import CharacterDisplay from '../CharacterDisplay';
import { Character } from 'types/map';
import { useCallback, useState } from 'react';

interface UserAvatarProps {
  src: DataUrl | undefined;
  username: string;
  displayName?: string;
  character: Character;
  className?: string;
  shouldLinkToProfile?: boolean;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  username,
  displayName,
  character,
  className,
  shouldLinkToProfile = true,
}) => {
  const history = useHistory();
  const user = useSelector(getUser);
  const [diameter, setDiameter] = useState<number>(40);

  const avatarRef = useCallback((node) => {
    if (node !== null) {
      setDiameter(node.getBoundingClientRect().height);
    }
  }, []);

  return (
    <Avatar
      style={{
        marginBottom: '0.5em',
        cursor: shouldLinkToProfile ? 'pointer' : undefined,
      }}
      className={className}
      src={src}
      {...stringAvatar(displayName ?? username)}
      onClick={() => {
        if (!shouldLinkToProfile) {
          return;
        }

        if (user?.username === username) {
          history.push(`${PROFILE_ROUTE}`);
          return;
        }
        history.push(`${PROFILE_ROUTE}/${username}`);
      }}
      ref={avatarRef}
    >
      <CharacterDisplay
        character={character}
        zoom={diameter > 100 ? 40 : 12}
        rotation={[Math.PI / 8, (2 * Math.PI) / 3, 0]}
        isAnimated={diameter > 100}
        position={[0, -3, 0]}
      />
    </Avatar>
  );
};

export default UserAvatar;
