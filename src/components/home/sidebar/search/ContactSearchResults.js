import FriendDisplay from '../FriendDisplay';

const ContactSearchResults = ({
  friendSearchResult,
  searchResultContactSelected,
  activeFriendId,
  messageThreads,
  setActiveFriendId,
  setActiveMessagesThread,
  setSearchResultContactSelected,
}) => {
  const onClickSelectFriend = (friendId) => {
    setActiveFriendId(friendId);
    setSearchResultContactSelected(true);

    const activeMessageThread = messageThreads.find((thread) => thread.friendParticipantId === friendId);

    setActiveMessagesThread(activeMessageThread);
  };

  return (
    <>
      {friendSearchResult.map((friend) => {
        const highlighted = (friend.id === activeFriendId) && searchResultContactSelected;

        return (
          <FriendDisplay
            key={friend.id}
            avatarId={friend.avatar_id}
            highlighted={highlighted}
            name={friend.name}
            setActiveMessagesThread={setActiveMessagesThread}
            onClick={() => onClickSelectFriend(friend.id)} />
        );
      })}
    </>
  );
};

export default ContactSearchResults;
