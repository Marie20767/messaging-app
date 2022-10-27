import { getFriendsSortedByMessageSent, onUpdateReadMessages } from '../../../utils/utils';
import FriendDisplay from './FriendDisplay';

const FriendsList = ({
  messageThreads,
  friends,
  friendIdsUnreadMessages,
  setFriendIdsUnreadMessages,
  activeFriendId,
  setActiveFriendId,
}) => {
  const getLastFriendMessage = (id) => {
    const friendMessageThread = messageThreads.find((messageThread) => {
      return messageThread.friendParticipantId === id;
    });

    if (!friendMessageThread) {
      return null;
    }

    const friendMessages = friendMessageThread.messages || [];
    const lastFriendMessage = friendMessages[friendMessages.length - 1];

    return lastFriendMessage?.text;
  };

  const sortedFriends = getFriendsSortedByMessageSent(messageThreads, friends);

  const onClickSelectFriend = (userId) => {
    setActiveFriendId(userId);
    onUpdateReadMessages(friendIdsUnreadMessages, userId, setFriendIdsUnreadMessages, messageThreads);
  };

  return (
    <>
      {sortedFriends.map((user) => {
        const lastFriendMessage = getLastFriendMessage(user.id);
        const highlighted = user.id === activeFriendId;
        const hasUnreadMessage = friendIdsUnreadMessages.includes(user.id);

        return (
          <FriendDisplay
            key={user.id}
            hasUnreadMessage={hasUnreadMessage}
            avatarId={user.avatar_id}
            name={user.name}
            highlighted={highlighted}
            onClick={() => onClickSelectFriend(user.id)}
            lastFriendMessage={lastFriendMessage} />
        );
      })}
    </>
  );
};

export default FriendsList;
