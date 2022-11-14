import { findFriendMessageThread, getFriendsSortedByMessageSent, getSortedMessages, onUpdateReadMessages } from '../../../utils/utils';
import FriendDisplay from './FriendDisplay';

const FriendsList = ({
  currentUser,
  messageThreads,
  setMessageThreads,
  friends,
  activeFriendId,
  setActiveFriendId,
  setShowActiveMessagesMobile,
}) => {
  const { id } = currentUser;

  const getLastFriendMessage = (userId) => {
    const friendMessageThread = findFriendMessageThread(userId, messageThreads);

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

    setShowActiveMessagesMobile(true);
  };

  return (
    <>
      {sortedFriends.map((user) => {
        const lastFriendMessageText = getLastFriendMessage(user.id);
        const highlighted = user.id === activeFriendId;
        let hasUnreadMessage = false;

        const sanitisedFriendMessageThread = findFriendMessageThread(user.id, messageThreads) || {};

        const sortedFriendMessageThread = getSortedMessages(sanitisedFriendMessageThread.messages);

        const lastFriendMessage = sortedFriendMessageThread[sortedFriendMessageThread.length - 1];

        const userHasUnreadMessagesFromFriend = sanitisedFriendMessageThread?.messages?.some((message) => message.read === false);
        const lastMessageIsSentByCurrentUser = lastFriendMessage?.sending_user_id === id;

        if (userHasUnreadMessagesFromFriend && !lastMessageIsSentByCurrentUser) {
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
            lastFriendMessageText={lastFriendMessageText} />
        );
      })}
    </>
  );
};

export default FriendsList;
