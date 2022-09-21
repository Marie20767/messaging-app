import styled from 'styled-components';
import { allAvatars } from '../../constants/constants';

const DemoUser = ({
  name,
  id,
  avatarId,
  activeUserId,
  setActiveUserId,
}) => {
  const userContainerClassName = activeUserId === id ? 'active-user' : 'non-active-user';
  const userAvatar = allAvatars.find((avatar) => avatar.id === avatarId);

  return (
    <StyledUserContainer onClick={() => setActiveUserId(id)} className={userContainerClassName}>
      <img src={userAvatar.animal} alt="user avatar" />
      <p>{name}</p>
    </StyledUserContainer>
  );
};

const StyledUserContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 12px 20px 15px;
  padding: 11px 10px;
  cursor: pointer;

  p {
    color: black;
    font-weight: bold;
  }

  &.active-user {
    background-color: #e9e9e9;
    border-radius: 10px;
  }

  &.non-active-user {
    background-color: transparent;

    &:hover {
      background-color: #f6f6f6;
      border-radius: 10px;
    }
  }

  img {
    height: 50px;
    margin-right: 10px;
  }

`;

export default DemoUser;

