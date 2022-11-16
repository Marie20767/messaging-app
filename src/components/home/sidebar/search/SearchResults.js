import { onUpdateReadMessages } from '../../../../utils/utils';
import ContactSearchResults from './ContactSearchResults';
import MessageSearchResults from './MessageSearchResults';
import SearchResultsHeader from './SearchResultsHeader';

const SearchResults = ({
  friendUserNameExists,
  friendSearchResult,
  messageExists,
  searchInput,
  messageThreads,
  setMessageThreads,
  messageThreadsSearchResults,
  activeSearchResultIds,
  setActiveSearchResultIds,
  currentUser,
  friends,
  setActiveFriendId,
  updateIsActiveMessageThreadShowing,
}) => {
  const onClickSelectFriend = (friendId) => {
    setActiveSearchResultIds({ friendId });
    setActiveFriendId(friendId);
    updateIsActiveMessageThreadShowing(true);

    onUpdateReadMessages(friendId, messageThreads, setMessageThreads);
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
        activeSearchResultIds={activeSearchResultIds}
        onClickSelectFriend={onClickSelectFriend} />
      <MessageSearchResults
        messageExists={messageExists}
        messageThreadsSearchResults={messageThreadsSearchResults}
        currentUser={currentUser}
        friends={friends}
        messageThreads={messageThreads}
        setMessageThreads={setMessageThreads}
        searchInput={searchInput}
        setActiveFriendId={setActiveFriendId}
        activeSearchResultIds={activeSearchResultIds}
        setActiveSearchResultIds={setActiveSearchResultIds}
        updateIsActiveMessageThreadShowing={updateIsActiveMessageThreadShowing} />
    </>
  );
};

export default SearchResults;
