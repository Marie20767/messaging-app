import { useState } from 'react';
import { APIDomain, avatars } from '../../../constants/constants';
import PickAvatar from '../../avatar/PickAvatar';
import LargeFullScreenOverlay from '../../overlays-and-popups/LargeFullScreenOverlay';

const ChangeAvatarOverlay = ({
  avatarId,
  currentUser,
  setCurrentUser,
  setShowAvatarOverlay,
  serverError,
  setServerError,
}) => {
  const [newSelectedAvatarId, setNewSelectedAvatarId] = useState(avatarId);

  const [firstAvatar, secondAvatar, thirdAvatar, fourthAvatar, ...lastFourAvatars] = avatars;
  const firstFourAvatars = [firstAvatar, secondAvatar, thirdAvatar, fourthAvatar];

  const onClickSelectNewAvatar = (id) => {
    setNewSelectedAvatarId(id);
  };

  const onClickSaveNewAvatar = async (newAvatarId) => {
    try {
      const response = await fetch(`${APIDomain}/users/${currentUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          avatar_id: newAvatarId,
        }),
      });
      const result = await response.json();

      if (!result.error) {
        setCurrentUser({
          ...currentUser,
          avatar_id: newAvatarId,
        });

        setShowAvatarOverlay(false);
      }
    } catch (e) {
      console.log('>>> onClickSaveNewAvatar error! ', e);
      setServerError('Something went wrong with your request');
    }
  };

  return (
    <LargeFullScreenOverlay onClick={() => setShowAvatarOverlay(false)}>
      <PickAvatar
        avatarId={newSelectedAvatarId}
        avatars1={firstFourAvatars}
        avatars2={lastFourAvatars}
        serverError={serverError}
        isOverlay
        onClickSelectAvatar={onClickSelectNewAvatar} />
      <button type="button" onClick={() => onClickSaveNewAvatar(newSelectedAvatarId)}>Save</button>
    </LargeFullScreenOverlay>
  );
};

export default ChangeAvatarOverlay;
