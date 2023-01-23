import { useDispatch, useSelector } from 'react-redux';

import { findFriendMessageThread, getSortedMessages, onUpdateReadMessages } from '../../../utils/utils';
import { setActiveFriendId, setMessageThreads } from '../../../redux/user';

import FriendDisplay from './FriendDisplay';

const FriendsList = ({
  friends,
  updateIsActiveMessageThreadShowing,
}) => {
  const {
    currentUser: { id: currentUserId },
    activeFriendId,
    messageThreads,
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const onClickSelectFriend = (friendId, friendHasUnreadMessage) => {
    dispatch(setActiveFriendId(friendId));
    if (friendHasUnreadMessage) {
      onUpdateReadMessages(friendId, messageThreads, setMessageThreads);
    }

    updateIsActiveMessageThreadShowing(true);
  };

  return (
    <>
      {friends.map((user) => {
        const highlighted = user.id === activeFriendId;
        let hasUnreadMessage = false;

        const sanitisedFriendMessageThread = findFriendMessageThread(user.id, messageThreads) || {};

        const sortedFriendMessageThread = getSortedMessages(sanitisedFriendMessageThread.messages);

        const lastFriendMessage = sortedFriendMessageThread[sortedFriendMessageThread.length - 1];

        const lastFriendMessageText = lastFriendMessage?.text;

        const userHasUnreadMessagesFromFriend = sanitisedFriendMessageThread?.messages?.some((message) => message.read === false);
        const lastMessageIsSentByCurrentUser = lastFriendMessage?.sending_user_id === currentUserId;

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
