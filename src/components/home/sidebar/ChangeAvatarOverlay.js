import { useState } from 'react';
import { avatars } from '../../../constants/constants';
import PickAvatar from '../../avatar/PickAvatar';
import FullScreenOverlay from '../../overlays-and-popups/FullScreenOverlay';

const ChangeAvatarOverlay = ({ avatarId, setShowAvatarOverlay, serverError, onClickSaveNewAvatar }) => {
  const [newSelectedAvatarId, setNewSelectedAvatarId] = useState(avatarId);

  const [firstAvatar, secondAvatar, thirdAvatar, fourthAvatar, ...lastFourAvatars] = avatars;
  const firstFourAvatars = [firstAvatar, secondAvatar, thirdAvatar, fourthAvatar];

  const onClickSelectNewAvatar = (id) => {
    setNewSelectedAvatarId(id);
  };

  return (
    <FullScreenOverlay onClick={() => setShowAvatarOverlay(false)}>
      <PickAvatar
        avatarId={newSelectedAvatarId}
        avatars1={firstFourAvatars}
        avatars2={lastFourAvatars}
        serverError={serverError}
        isOverlay
        onClickSelectAvatar={onClickSelectNewAvatar} />
      <button type="button" onClick={() => onClickSaveNewAvatar(newSelectedAvatarId)}>Save</button>
    </FullScreenOverlay>
  );
};

export default ChangeAvatarOverlay;
