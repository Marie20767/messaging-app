import { useDispatch, useSelector } from 'react-redux';

import { setActiveFriendId, setMessageThreads } from '../../../../redux/user';
import { onUpdateReadMessages } from '../../../../utils/utils';

import ContactSearchResults from './ContactSearchResults';
import MessageSearchResults from './MessageSearchResults';
import SearchResultsHeader from './SearchResultsHeader';

const SearchResults = ({
  friendUserNameExists,
  friendSearchResult,
  messageExists,
  searchInput,
  messageThreadsSearchResults,
  activeSearchResultIds,
  setActiveSearchResultIds,
  friends,
  updateIsActiveMessageThreadShowing,
}) => {
  const { messageThreads } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const onClickSelectFriend = (friendId) => {
    setActiveSearchResultIds({ friendId });
    dispatch(setActiveFriendId(friendId));
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
        friends={friends}
        searchInput={searchInput}
        activeSearchResultIds={activeSearchResultIds}
        setActiveSearchResultIds={setActiveSearchResultIds}
        updateIsActiveMessageThreadShowing={updateIsActiveMessageThreadShowing} />
    </>
  );
};

export default SearchResults;
