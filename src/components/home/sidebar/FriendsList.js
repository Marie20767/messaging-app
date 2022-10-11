import FriendDisplay from './FriendDisplay';

const FriendsList = ({
  messageThreads,
  friends,
  activeFriendId,
  setActiveFriendId,
  setActiveMessagesThread,
}) => {
  const onClickSelectFriend = (friendId) => {
    setActiveFriendId(friendId);

    const activeMessageThread = messageThreads.find((thread) => thread.friendParticipantId === friendId);

    setActiveMessagesThread(activeMessageThread);
  };

  const getLastFriendMessage = (id) => {
    const friendMessageThread = messageThreads.find((messageThread) => {
      return messageThread.friendParticipantId === id;
    });

    const lastFriendMessage = friendMessageThread.messages[friendMessageThread.messages.length - 1].text;

    return lastFriendMessage;
  };

  return (
    <>
      {friends.map((user) => {
        const lastFriendMessage = getLastFriendMessage(user.id);
        const highlighted = user.id === activeFriendId;

        return (
          <FriendDisplay
            key={user.id}
            avatarId={user.avatar_id}
            name={user.name}
            highlighted={highlighted}
            setActiveMessagesThread={setActiveMessagesThread}
            onClick={() => onClickSelectFriend(user.id)}
            lastFriendMessage={lastFriendMessage} />
        );
      })}
    </>
  );
};

export default FriendsList;
