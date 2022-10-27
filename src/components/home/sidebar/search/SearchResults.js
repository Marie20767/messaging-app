import { onUpdateReadMessages } from '../../../../utils/utils';
import ContactSearchResults from './ContactSearchResults';
import MessageSearchResults from './MessageSearchResults';
import SearchResultsHeader from './SearchResultsHeader';

const SearchResults = ({
  friendUserNameExists,
  friendSearchResult,
  friendIdsUnreadMessages,
  setFriendIdsUnreadMessages,
  messageExists,
  searchInput,
  messageThreads,
  messageThreadsSearchResults,
  activeSearchResultIds,
  setActiveSearchResultIds,
  currentUser,
  friends,
  setActiveFriendId,
}) => {
  const onClickSelectFriend = (friendId) => {
    setActiveSearchResultIds({ friendId });
    setActiveFriendId(friendId);

    onUpdateReadMessages(friendIdsUnreadMessages, friendId, setFriendIdsUnreadMessages, messageThreads);
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
        friendIdsUnreadMessages={friendIdsUnreadMessages}
        setFriendIdsUnreadMessages={setFriendIdsUnreadMessages}
        currentUser={currentUser}
        friends={friends}
        messageThreads={messageThreads}
        searchInput={searchInput}
        setActiveFriendId={setActiveFriendId}
        activeSearchResultIds={activeSearchResultIds}
        setActiveSearchResultIds={setActiveSearchResultIds} />
    </>
  );
};

export default SearchResults;
