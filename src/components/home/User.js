import styled from 'styled-components';

const User = ({
  name,
  id,
  activeUserId,
  setActiveUserId,
  onClickDeleteUser,
}) => {
  const userContainerClassName = activeUserId === id ? 'active-user' : 'non-active-user';

  return (
    <>
      <StyledUserContainer onClick={() => setActiveUserId(id)} className={userContainerClassName}>
        <h2>{name}</h2>
      </StyledUserContainer>
      <button type="button" onClick={() => onClickDeleteUser(id)}>Delete user</button>
    </>
  );
};

const StyledUserContainer = styled.div`
  &.active-user {
    background-color: #e9e9e9;;
  }

  &.non-active-user {
    background-color: transparent;
  }

`;

export default User;

