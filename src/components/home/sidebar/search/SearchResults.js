import ContactSearchResults from './ContactSearchResults';
import MessageSearchResults from './MessageSearchResults';
import SearchResultsHeader from './SearchResultsHeader';

const SearchResults = ({
  friendUserNameExists,
  friendSearchResult,
  messageExists,
  searchInput,
  messageThreads,
  messageThreadsSearchResults,
  currentUser,
  users,
  activeFriendId,
  searchResultContactSelected,
  setActiveFriendId,
  setActiveMessagesThread,
  setSearchResultContactSelected,
}) => {
  return (
    <>
      <SearchResultsHeader
        friendUserNameExists={friendUserNameExists}
        friendSearchResult={friendSearchResult}
        messageExists={messageExists}
        searchInput={searchInput} />
      <ContactSearchResults
        friendSearchResult={friendSearchResult}
        messageThreads={messageThreads}
        activeFriendId={activeFriendId}
        searchResultContactSelected={searchResultContactSelected}
        setActiveFriendId={setActiveFriendId}
        setActiveMessagesThread={setActiveMessagesThread}
        setSearchResultContactSelected={setSearchResultContactSelected} />
      <MessageSearchResults
        messageExists={messageExists}
        messageThreadsSearchResults={messageThreadsSearchResults}
        currentUser={currentUser}
        users={users}
        messageThreads={messageThreads}
        searchInput={searchInput}
        setActiveMessagesThread={setActiveMessagesThread}
        setActiveFriendId={setActiveFriendId} />
    </>
  );
};

export default SearchResults;
