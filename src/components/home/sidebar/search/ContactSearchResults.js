import FriendDisplay from '../FriendDisplay';

const ContactSearchResults = ({
  friendSearchResult,
  activeSearchResultIds,
  onClickSelectFriend,
}) => {
  return (
    <>
      {friendSearchResult.map((friend) => {
        const highlighted = friend.id === activeSearchResultIds?.friendId;

        return (
          <FriendDisplay
            key={friend.id}
            avatarId={friend.avatar_id}
            highlighted={highlighted}
            name={friend.name}
            onClick={() => onClickSelectFriend(friend.id)} />
        );
      })}
    </>
  );
};

export default ContactSearchResults;
