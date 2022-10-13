import FriendDisplay from './FriendDisplay';

const FriendsList = ({
  messageThreads,
  friends,
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
            onClick={() => setActiveFriendId(user.id)}
            lastFriendMessage={lastFriendMessage} />
        );
      })}
    </>
  );
};

export default FriendsList;
