import styled from 'styled-components';
import AvatarDisplay from './AvatarDisplay';

const PickAvatar = ({
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
      </StyledAvatarTitleContainer>
      <AvatarDisplay
        avatars1={avatars1}
        avatars2={avatars2}
        avatarId={avatarId}
        tabIndex={tabIndex}
        onKeyDown={onKeyDown}
        onClickSelectAvatar={onClickSelectAvatar} />
      {serverError
        ? <p className="error-message server-error">{serverError}</p>
        : null
        }
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
    ${(props) => props.$isAvatarMissing ? 'color: #b52f06f0' : ''}
  }

  h2 {
    font-size: 18px;
  }

  @media screen and (min-width: 768px) {
    h2 {
      font-size: 20px;
    }
  }

  @media screen and (min-width: 1024px) {
    h2 {
      font-size: 23px;
    }
  }

  p {
    margin-top: 20px;
  }

  .avatar-title-line {
    height: 1px;
    width: 100%;
    background-color: #8a8a8b;
    ${(props) => props.$isAvatarMissing ? 'background-color: #b52f06f0' : ''}
  }
`;

export default PickAvatar;
