import AvatarRow from './AvatarRow';

const AvatarDisplay = ({ avatars1, avatars2, avatarId, tabIndex, onKeyDown, onClickSelectAvatar }) => {
  return (
    <>
      <AvatarRow
        avatars={avatars1}
        avatarId={avatarId}
        tabIndex={tabIndex}
        onKeyDown={onKeyDown}
        onClickSelectAvatar={onClickSelectAvatar} />
      <AvatarRow
        avatars={avatars2}
        avatarId={avatarId}
        tabIndex={tabIndex}
        onKeyDown={onKeyDown}
        onClickSelectAvatar={onClickSelectAvatar} />
    </>
  );
};

export default AvatarDisplay;
