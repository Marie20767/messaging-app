import { useState } from 'react';
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
  friends,
  setActiveFriendId,
}) => {
  const [activeSearchResultId, setActiveSearchResultId] = useState(null);

  const onClickSelectFriend = (friendId) => {
    setActiveSearchResultId(friendId);
    setActiveFriendId(friendId);
  };

  const noSearchResultText = `No result for '${searchInput}'`;

  const hasSearchResults = messageThreadsSearchResults?.length > 0 || friendSearchResult?.length > 0;

  return (
    <>
      <SearchResultsHeader
        title="Contacts"
        hasSearchResults={hasSearchResults}
        friendUserNameExists={friendUserNameExists}
        searchInput={searchInput}
        noSearchResultText={noSearchResultText} />
      <ContactSearchResults
        friendSearchResult={friendSearchResult}
        activeSearchResultId={activeSearchResultId}
        onClickSelectFriend={onClickSelectFriend} />
      <MessageSearchResults
        messageExists={messageExists}
        messageThreadsSearchResults={messageThreadsSearchResults}
        currentUser={currentUser}
        friends={friends}
        messageThreads={messageThreads}
        searchInput={searchInput}
        setActiveFriendId={setActiveFriendId}
        activeSearchResultId={activeSearchResultId}
        setActiveSearchResultId={setActiveSearchResultId} />
    </>
  );
};

export default SearchResults;
