import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { allAvatars } from '../../../constants/constants';

const MessagesHeader = ({ friends, activeFriendId, setShowActiveMessagesMobile }) => {
  const activeFriend = friends.find((user) => user.id === activeFriendId);

  const activeFriendAvatar = allAvatars.find((avatar) => avatar.id === activeFriend?.avatar_id);

  return (
    <StyledHeaderContainer>
      <StyledNameAndAvatarContainer>
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="back-to-sidebar-icon"
          onClick={() => setShowActiveMessagesMobile(false)} />
        <img src={activeFriendAvatar?.animal} alt="Avatar" />
        <h3 className="small-black-title">{activeFriend?.name}</h3>
      </StyledNameAndAvatarContainer>
    </StyledHeaderContainer>
  );
};

const StyledHeaderContainer = styled.div`
  display: flex;
  height: 70px;
  padding: 15px 25px 15px 15px;
  margin-top: 15px;

  @media screen and (min-width: 1024px) {
    margin-top: 0px;
  }
`;

const StyledNameAndAvatarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  img {
    height: 40px;
    margin-right: 10px;
  }

  .back-to-sidebar-icon {
    margin-right: 20px;
    margin-left: 10px;
    font-size: 20px;
  }

  @media screen and (min-width: 768px) { 
    .back-to-sidebar-icon {
      display: none;
    }
  }
`;

export default MessagesHeader;
