import styled from 'styled-components';

const AvatarRow = ({ avatars, avatarId, tabIndex, onKeyDown, onClickSelectAvatar }) => {
  return (
    <StyledAvatarContainer>
      {avatars.map((avatar) => {
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
  );
};

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

export default AvatarRow;
