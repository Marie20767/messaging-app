import styled from 'styled-components';

const AvatarDisplay = ({
  isAvatarMissing = false,
  isOverlay = false,
  avatars1,
  avatars2,
  avatarId,
  serverError,
  tabIndex,
  onKeyDown,
  onClickSelectAvatar,
}) => {
  return (
    <>
      <StyledAvatarTitleContainer $isAvatarMissing={isAvatarMissing}>
        {isOverlay
          ? <h2>Choose your new avatar</h2>
          : <h3>Choose your avatar</h3>
        }
        <div className="avatar-title-line" />
        {serverError
          ? <p className="error-message server-error">{serverError}</p>
          : null
        }
      </StyledAvatarTitleContainer>
      <StyledAvatarContainer>
        {avatars1.map((avatar) => {
          const avatarClassName = avatarId === avatar.id ? 'selected-avatar' : '';

          return (
            <img
              key={avatar.id}
              tabIndex={tabIndex}
              onKeyDown={onKeyDown}
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
              tabIndex={tabIndex}
              onKeyDown={onKeyDown}
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
  display: flex;
  flex-direction: column;
  align-items: center;
  
  h3 {
    margin: 2px 0;
    color: #8a8a8b;
    ${(props) => props.$isAvatarMissing ? 'color: #dd3a08' : ''}
  }

  h2 {
    font-size: 23px;
  }

  p {
    margin-top: 20px;
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
