/* eslint-disable react/jsx-no-useless-fragment */
import SearchResults from './search/SearchResults';
import FriendsList from './FriendsList';

const FriendsAndSearchSidebar = ({
  users,
  currentUser,
  isSearching,
  searchInput,
  friendSearchResult,
  friendUserNameExists,
  messageThreadsSearchResults,
  messageExists,
  activeFriendId,
  setActiveFriendId,
  messageThreads,
  setActiveMessagesThread,
  searchResultContactSelected,
  setSearchResultContactSelected,
}) => {
  return (
    <>
      {isSearching
        ? (
          <SearchResults
            friendUserNameExists={friendUserNameExists}
            friendSearchResult={friendSearchResult}
            messageExists={messageExists}
            searchInput={searchInput}
            messageThreads={messageThreads}
            messageThreadsSearchResults={messageThreadsSearchResults}
            currentUser={currentUser}
            users={users}
            searchResultContactSelected={searchResultContactSelected}
            activeFriendId={activeFriendId}
            setActiveFriendId={setActiveFriendId}
            setActiveMessagesThread={setActiveMessagesThread}
            setSearchResultContactSelected={setSearchResultContactSelected} />
        )
        : (
          <FriendsList
            users={users}
            messageThreads={messageThreads}
            activeFriendId={activeFriendId}
            setActiveFriendId={setActiveFriendId}
            setActiveMessagesThread={setActiveMessagesThread} />
        )
        }
    </>
  );
};

export default FriendsAndSearchSidebar;
