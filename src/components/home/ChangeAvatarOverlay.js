import { avatars } from '../../constants/constants';
import AvatarDisplay from '../AvatarDisplay';
import FullScreenOverlay from '../overlays and popups/FullScreenOverlay';

const ChangeAvatarOverlay = ({ avatarId, setShowAvatarOverlay, onClickSelectAvatar }) => {
  const [firstAvatar, secondAvatar, thirdAvatar, fourthAvatar, ...lastFourAvatars] = avatars;
  const firstFourAvatars = [firstAvatar, secondAvatar, thirdAvatar, fourthAvatar];

  return (
    <FullScreenOverlay onClick={() => setShowAvatarOverlay(false)}>
      <AvatarDisplay
        avatarId={avatarId}
        onClickSelectAvatar={onClickSelectAvatar}
        avatars1={firstFourAvatars}
        avatars2={lastFourAvatars} />
      <button type="button">Save</button>
    </FullScreenOverlay>
  );
};

export default ChangeAvatarOverlay;
