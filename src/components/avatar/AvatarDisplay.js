import styled from 'styled-components';
import AvatarRow from './AvatarRow';

const AvatarDisplay = ({ avatars1, avatars2, avatarId, tabIndex, onKeyDown, onClickSelectAvatar }) => {
  return (
    <StyledAvatarContainer>
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
