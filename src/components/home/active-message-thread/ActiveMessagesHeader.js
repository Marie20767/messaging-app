import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { allAvatars } from '../../../constants/constants';

const MessagesHeader = ({ friends, activeFriendId }) => {
  const activeFriend = friends.find((user) => user.id === activeFriendId);
  const activeFriendAvatar = allAvatars.find((avatar) => avatar.id === activeFriend.avatar_id);

  console.log('>>> activeFriendId: ', activeFriendId);

  return (
    <StyledHeader>
      <StyledNameAndAvatarContainer>
        <img src={activeFriendAvatar?.animal} alt="Avatar" />
        <h3 className="small-black-title">{activeFriend?.name}</h3>
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

  img {
    height: 40px;
    margin-right: 10px;
  }
`;

export default MessagesHeader;
