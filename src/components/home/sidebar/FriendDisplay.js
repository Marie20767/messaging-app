import styled from 'styled-components';
import { allAvatars } from '../../../constants/constants';

const FriendDisplay = ({
  name,
  id,
  avatarId,
  messageThreads,
  isMessageSearchResult,
  messageMatchingSearchInput,
  setActiveMessagesThread,
  activeFriendId,
  setActiveFriendId,
}) => {
  const friendContainerClassName = activeFriendId === id ? 'active-friend' : 'non-active-friend';
  const friendAvatar = allAvatars.find((avatar) => avatar.id === avatarId);

  const onClickSelectFriend = (friendId) => {
    setActiveFriendId(friendId);

    const activeMessageThread = messageThreads.find((thread) => thread.friendParticipantId === parseInt(friendId));

    setActiveMessagesThread(activeMessageThread);
  };

  const getLastFriendMessage = () => {
    const friendMessageThread = messageThreads.find((messageThread) => {
      return messageThread.friendParticipantId === parseInt(id);
    });

    const lastFriendMessage = friendMessageThread.messages[friendMessageThread.messages.length - 1].text;

    const lastFriendMessageSplitByWords = lastFriendMessage.split(' ');

    return lastFriendMessageSplitByWords;
  };

  return (
    <StyledFriendContainer onClick={() => onClickSelectFriend(id)} className={friendContainerClassName}>
      <img src={friendAvatar.animal} alt="Friend avatar" />
      <StyledNameAndMessageContainer>
        <h4 className="small-black-title">{name}</h4>
        {isMessageSearchResult
          ? <p>{messageMatchingSearchInput}</p>
          : <p className="last-message">{getLastFriendMessage().length > 13 ? `${getLastFriendMessage().slice(0, 13).join(' ')}...` : getLastFriendMessage().join(' ')}</p>
        }
      </StyledNameAndMessageContainer>
    </StyledFriendContainer>
  );
};

const StyledFriendContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 0 15px 10px;
  margin: 0 5px 0 15px;
  cursor: pointer;

  &.active-friend {
    background-color: #9dbbf8a9;
    border-radius: 10px;
  }

  &.non-active-friend {
    background-color: transparent;

    &:hover {
      background-color: #e7e6e6;
      border-radius: 10px;
    }
  }

  img {
    height: 50px;
    margin-right: 10px;
  }
`;

const StyledNameAndMessageContainer = styled.div`
  p {
    font-size: 14px;
  }
  
  .last-message {
    margin-top: 2px;
    padding-right: 25px;
  }
`;

export default FriendDisplay;

