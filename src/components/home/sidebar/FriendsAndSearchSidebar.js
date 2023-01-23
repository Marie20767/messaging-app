import { useSelector } from 'react-redux';

import SearchResults from './search/SearchResults';
import FriendsList from './FriendsList';

const FriendsAndSearchSidebar = ({
  friends,
  searchInput,
  friendSearchResult,
  friendUserNameExists,
  messageThreadsSearchResults,
  messageExists,
  activeSearchResultIds,
  setActiveSearchResultIds,
  isActiveMessageThreadShowing,
  updateIsActiveMessageThreadShowing,
}) => {
  const { isSearching } = useSelector((state) => state.user);

  if (isSearching) {
    return (
      <SearchResults
        friendUserNameExists={friendUserNameExists}
        friendSearchResult={friendSearchResult}
        messageExists={messageExists}
        searchInput={searchInput}
        messageThreadsSearchResults={messageThreadsSearchResults}
        friends={friends}
        activeSearchResultIds={activeSearchResultIds}
        setActiveSearchResultIds={setActiveSearchResultIds}
        updateIsActiveMessageThreadShowing={updateIsActiveMessageThreadShowing} />
    );
  }

  return (
    <FriendsList
      friends={friends}
      isActiveMessageThreadShowing={isActiveMessageThreadShowing}
      updateIsActiveMessageThreadShowing={updateIsActiveMessageThreadShowing} />
  );
};

export default FriendsAndSearchSidebar;
