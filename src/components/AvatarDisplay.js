import styled from 'styled-components';

const AvatarDisplay = ({
  isAvatarMissing = false,
  onClickSelectAvatar,
  avatars1,
  avatars2,
  avatarId,
}) => {
  return (
    <>
      <StyledAvatarTitleContainer $isAvatarMissing={isAvatarMissing}>
        <h3>Choose your avatar</h3>
        <div className="avatar-title-line" />
      </StyledAvatarTitleContainer>
      <StyledAvatarContainer>
        {avatars1.map((avatar) => {
          const avatarClassName = avatarId === avatar.id ? 'selected-avatar' : '';

          return (
            <img
              key={avatar.id}
              className={avatarClassName}
              src={avatar.animal}
              alt="animal-avatar"
              onClick={() => onClickSelectAvatar(avatar.id)} />
          );
        })}
      </StyledAvatarContainer>
      <StyledAvatarContainer>
        {avatars2.map((avatar) => {
          const avatarClassName = avatarId === avatar.id ? 'selected-avatar' : '';

          return (
            <img
              key={avatar.id}
              className={avatarClassName}
              src={avatar.animal}
              alt="animal-avatar"
              onClick={() => onClickSelectAvatar(avatar.id)} />
          );
        })}
      </StyledAvatarContainer>
    </>
  );
};

const StyledAvatarTitleContainer = styled.div`
  h3 {
    margin: 2px 0;
    color: #8a8a8b;
    ${(props) => props.$isAvatarMissing ? 'color: #dd3a08' : ''}
  }

  .avatar-title-line {
    height: 1px;
    width: 100%;
    background-color: #8a8a8b;
    ${(props) => props.$isAvatarMissing ? 'background-color: #dd3a08' : ''}
  }
`;

const StyledAvatarContainer = styled.div`
  img {
    height: 70px;
    margin-right: 15px;
    cursor: pointer;
  }

  .selected-avatar {
    border: 4.5px dashed #ea738dff;
    border-radius: 55%;
    }
`;

export default AvatarDisplay;
