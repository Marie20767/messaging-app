import FriendDisplay from '../FriendDisplay';

const ContactSearchResults = ({
  friendSearchResult,
  activeSearchResultId,
  onClickSelectFriend,
}) => {
  return (
    <>
      {friendSearchResult.map((friend) => {
        const highlighted = friend.id === activeSearchResultId;

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
