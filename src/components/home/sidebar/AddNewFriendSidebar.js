/* eslint-disable react/jsx-no-useless-fragment */
import styled from 'styled-components';
import ContactSearchResults from './search/ContactSearchResults';
import SearchResultsHeader from './search/SearchResultsHeader';

const AddNewFriendSidebar = ({
  isSearchingForNewFriend,
  searchInput,
  friendSearchResult,
  friendUserNameExists,
  setIsAddingNewFriend,
  activeNewFriendId,
  setActiveNewFriendId,
  searchResultNewFriendSelected,
  setSearchResultNewFriendSelected,
  setAddNewFriendError,
}) => {
  const noSearchResultText = `User called '${searchInput}' doesn't exist. Ask your friend to register first.`;

  const onClickSelectFriend = (friendId) => {
    setActiveNewFriendId(friendId);
    setAddNewFriendError(null);
    setSearchResultNewFriendSelected(true);
    setIsAddingNewFriend(true);
  };

  return (
    <StyledAddNewFriendSidebarContainer>
      <SearchResultsHeader
        title="Add Friend"
        hasSearchResults={friendSearchResult?.length}
        searchInput={searchInput}
        friendUserNameExists={friendUserNameExists}
        noSearchResultText={noSearchResultText} />
      {isSearchingForNewFriend
        ? (
          <ContactSearchResults
            friendSearchResult={friendSearchResult}
            activeFriendId={activeNewFriendId}
            searchResultContactSelected={searchResultNewFriendSelected}
            onClickSelectFriend={onClickSelectFriend} />
        )
        : null
      }
    </StyledAddNewFriendSidebarContainer>
  );
};

const StyledAddNewFriendSidebarContainer = styled.div`
  margin-top: 80px;
`;

export default AddNewFriendSidebar;
