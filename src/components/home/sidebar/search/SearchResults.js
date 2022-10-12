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
  activeFriendId,
  searchResultContactSelected,
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
        activeFriendId={activeFriendId}
        searchResultContactSelected={searchResultContactSelected}
        setActiveMessagesThread={setActiveMessagesThread}
        onClickSelectFriend={onClickSelectFriend} />
      <MessageSearchResults
        messageExists={messageExists}
        messageThreadsSearchResults={messageThreadsSearchResults}
        currentUser={currentUser}
        friends={friends}
        messageThreads={messageThreads}
        searchInput={searchInput}
        setActiveMessagesThread={setActiveMessagesThread}
        setActiveFriendId={setActiveFriendId} />
    </>
  );
};

export default SearchResults;
