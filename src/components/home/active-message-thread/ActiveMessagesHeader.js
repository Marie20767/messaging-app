import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { demoUsersAvatars } from '../../../constants/constants';

const MessagesHeader = ({ users, activeFriendId }) => {
  const activeFriend = users.find((user) => user.id === activeFriendId);
  const activeFriendAvatar = demoUsersAvatars.find((avatar) => avatar.id === activeFriend.avatar_id);

  return (
    <StyledHeader>
      <StyledNameAndAvatarContainer>
        <img src={activeFriendAvatar?.animal} alt="Avatar" />
        <h3>{activeFriend?.name}</h3>
      </StyledNameAndAvatarContainer>
      <FontAwesomeIcon icon={faTrashCan} fontSize="18px" className="clickable" />
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  padding: 15px 25px 15px 15px;
`;

const StyledNameAndAvatarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  h3 {
    color: black;
    font-weight: bold;
    font-size: 17px;
  }

  img {
    height: 40px;
    margin-right: 10px;
  }
`;

export default MessagesHeader;
