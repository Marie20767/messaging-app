import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { APIPath, avatars } from '../../../constants/constants';
import { setCurrentUser } from '../../../redux/user';

import PickAvatar from '../../avatar/PickAvatar';
import LargeFullScreenOverlay from '../../overlays-and-popups/LargeFullScreenOverlay';

const ChangeAvatarOverlay = ({
  setShowAvatarOverlay,
  serverError,
  setServerError,
}) => {
  const { currentUser } = useSelector((state) => state.user);
  const { id: currentUserId, avatar_id } = currentUser;

  const [newSelectedAvatarId, setNewSelectedAvatarId] = useState(avatar_id);

  const [firstAvatar, secondAvatar, thirdAvatar, fourthAvatar, ...lastFourAvatars] = avatars;
  const firstFourAvatars = [firstAvatar, secondAvatar, thirdAvatar, fourthAvatar];

  const dispatch = useDispatch();

  const onClickSaveNewAvatar = async () => {
    try {
      const response = await fetch(`${APIPath}/users/${currentUserId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          avatar_id: newSelectedAvatarId,
        }),
      });
      const result = await response.json();

      if (!result.error) {
        dispatch(setCurrentUser({
          ...currentUser,
          avatar_id: newSelectedAvatarId,
        }));

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
        onClickSelectAvatar={(id) => setNewSelectedAvatarId(id)} />
      <button type="button" onClick={onClickSaveNewAvatar}>Save</button>
    </LargeFullScreenOverlay>
  );
};

export default ChangeAvatarOverlay;
