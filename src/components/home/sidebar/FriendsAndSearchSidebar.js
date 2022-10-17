/* eslint-disable react/jsx-no-useless-fragment */
import SearchResults from './search/SearchResults';
import FriendsList from './FriendsList';

const FriendsAndSearchSidebar = ({
  friends,
  currentUser,
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
            friends={friends}
            setActiveFriendId={setActiveFriendId}
            activeSearchResultIds={activeSearchResultIds}
            setActiveSearchResultIds={setActiveSearchResultIds} />
        )
        : (
          <FriendsList
            friends={friends}
            messageThreads={messageThreads}
            activeFriendId={activeFriendId}
            setActiveFriendId={setActiveFriendId} />
        )
        }
    </>
  );
};

export default FriendsAndSearchSidebar;
