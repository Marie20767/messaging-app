import SearchResults from './search/SearchResults';
import FriendsList from './FriendsList';

const FriendsAndSearchSidebar = ({
  friends,
  isSearching,
  searchInput,
  friendSearchResult,
  friendUserNameExists,
  messageThreadsSearchResults,
  messageExists,
  activeFriendId,
  setActiveFriendId,
  activeSearchResultIds,
  setActiveSearchResultIds,
  messageThreads,
  setMessageThreads,
  isActiveMessageThreadShowing,
  updateIsActiveMessageThreadShowing,
}) => {
  if (isSearching) {
    return (
      <SearchResults
        friendUserNameExists={friendUserNameExists}
        friendSearchResult={friendSearchResult}
        messageExists={messageExists}
        searchInput={searchInput}
        messageThreads={messageThreads}
        setMessageThreads={setMessageThreads}
        messageThreadsSearchResults={messageThreadsSearchResults}
        friends={friends}
        setActiveFriendId={setActiveFriendId}
        activeSearchResultIds={activeSearchResultIds}
        setActiveSearchResultIds={setActiveSearchResultIds}
        updateIsActiveMessageThreadShowing={updateIsActiveMessageThreadShowing} />
    );
  }

  return (
    <FriendsList
      friends={friends}
      messageThreads={messageThreads}
      setMessageThreads={setMessageThreads}
      activeFriendId={activeFriendId}
      setActiveFriendId={setActiveFriendId}
      isActiveMessageThreadShowing={isActiveMessageThreadShowing}
      updateIsActiveMessageThreadShowing={updateIsActiveMessageThreadShowing} />
  );
};

export default FriendsAndSearchSidebar;
