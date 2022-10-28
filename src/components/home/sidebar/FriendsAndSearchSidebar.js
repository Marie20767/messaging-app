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
  setMessageThreads,
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
            setMessageThreads={setMessageThreads}
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
            setMessageThreads={setMessageThreads}
            activeFriendId={activeFriendId}
            setActiveFriendId={setActiveFriendId} />
        )
        }
    </>
  );
};

export default FriendsAndSearchSidebar;
