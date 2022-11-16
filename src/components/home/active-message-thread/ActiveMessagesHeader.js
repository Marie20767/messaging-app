import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { allAvatars } from '../../../constants/constants';

const MessagesHeader = ({ friends, activeFriendId, updateIsActiveMessageThreadShowing }) => {
  const activeFriend = friends.find((user) => user.id === activeFriendId);

  const activeFriendAvatar = allAvatars.find((avatar) => avatar.id === activeFriend?.avatar_id);

  return (
    <div>
      <StyledHeaderPlaceholder />
      <StyledHeaderContainer>
        <StyledNameAndAvatarContainer>
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="back-to-sidebar-icon"
            onClick={() => updateIsActiveMessageThreadShowing(false)} />
          <img src={activeFriendAvatar?.animal} alt="Avatar" />
          <h3 className="small-black-title">{activeFriend?.name}</h3>
        </StyledNameAndAvatarContainer>
      </StyledHeaderContainer>
    </div>
  );
};

const StyledHeaderPlaceholder = styled.div`
  height: 70px;
`;

const StyledHeaderContainer = styled.div`
  display: flex;
  padding: 15px 25px 15px 15px;
  position: fixed;
  z-index: 8;
  top: 0;
  background-color: #f8f7f7;
  width: 100%;

  @media screen and (min-width: 768px) {
    margin-top: 0px;
    padding: 20px 25px 9px 15px;
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
    padding: 10px 20px 10px 10px;
    font-size: 20px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  @media screen and (min-width: 768px) { 
    .back-to-sidebar-icon {
      display: none;
    }
  }
`;

export default MessagesHeader;
