import styled from 'styled-components';

import AvatarRow from './AvatarRow';

const AvatarDisplay = ({ avatarId, avatars1, avatars2, tabIndex, onKeyDown, onClickSelectAvatar }) => {
  return (
    <StyledAvatarContainer>
      <AvatarRow
        avatarId={avatarId}
        avatars={avatars1}
        tabIndex={tabIndex}
        onKeyDown={onKeyDown}
        onClickSelectAvatar={onClickSelectAvatar} />
      <AvatarRow
        avatarId={avatarId}
        avatars={avatars2}
        tabIndex={tabIndex}
        onKeyDown={onKeyDown}
        onClickSelectAvatar={onClickSelectAvatar} />
    </StyledAvatarContainer>
  );
};

const StyledAvatarContainer = styled.div`
  margin-top: 10px;

  @media screen and (min-width: 1024px) {
    margin-top: 0;
  }
`;

export default AvatarDisplay;
