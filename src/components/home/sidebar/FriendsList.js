import { findFriendMessageThread, getFriendsSortedByMessageSent, onUpdateReadMessages } from '../../../utils/utils';
import FriendDisplay from './FriendDisplay';

const FriendsList = ({
  messageThreads,
  setMessageThreads,
  friends,
  activeFriendId,
  setActiveFriendId,
}) => {
  const getLastFriendMessage = (id) => {
    const friendMessageThread = findFriendMessageThread(id, messageThreads);

    if (!friendMessageThread) {
      return null;
    }

    const friendMessages = friendMessageThread.messages || [];
    const lastFriendMessage = friendMessages[friendMessages.length - 1];

    return lastFriendMessage?.text;
  };

  const sortedFriends = getFriendsSortedByMessageSent(messageThreads, friends);

  const onClickSelectFriend = (friendId, friendHasUnreadMessage) => {
    setActiveFriendId(friendId);
    if (friendHasUnreadMessage) {
      onUpdateReadMessages(friendId, messageThreads, setMessageThreads);
    }
  };

  return (
    <>
      {sortedFriends.map((user) => {
        const lastFriendMessage = getLastFriendMessage(user.id);
        const highlighted = user.id === activeFriendId;
        let hasUnreadMessage = false;

        const friendMessageThread = findFriendMessageThread(user.id, messageThreads);
        const friendHasUnreadMessages = friendMessageThread.messages.some((message) => message.read === false);

        if (friendHasUnreadMessages && friendMessageThread.friendParticipantId !== activeFriendId) {
          hasUnreadMessage = true;
        }

        return (
          <FriendDisplay
            key={user.id}
            hasUnreadMessage={hasUnreadMessage}
            avatarId={user.avatar_id}
            name={user.name}
            highlighted={highlighted}
            onClick={() => onClickSelectFriend(user.id, hasUnreadMessage)}
            lastFriendMessage={lastFriendMessage} />
        );
      })}
    </>
  );
};

export default FriendsList;
