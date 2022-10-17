/* eslint-disable react/jsx-no-useless-fragment */
import styled from 'styled-components';
import ContactSearchResults from './search/ContactSearchResults';
import SearchResultsHeader from './search/SearchResultsHeader';

const AddNewFriendSidebar = ({
  searchInput,
  friendSearchResult,
  friendUserNameExists,
  activeNewFriendId,
  setActiveNewFriendId,
  setAddNewFriendError,
}) => {
  const noSearchResultText = `User called '${searchInput}' doesn't exist. Ask your friend to register first.`;

  const onClickSelectFriend = (friendId) => {
    setActiveNewFriendId(friendId);
    setAddNewFriendError(null);
  };

  return (
    <StyledAddNewFriendSidebarContainer>
      {searchInput !== ''
        ? (
          <>
            <SearchResultsHeader
              title="Add Friend"
              hasSearchResults={friendSearchResult?.length}
              friendUserNameExists={friendUserNameExists}
              noSearchResultText={noSearchResultText} />

            <ContactSearchResults
              friendSearchResult={friendSearchResult}
              activeSearchResultIds={activeNewFriendId}
              onClickSelectFriend={onClickSelectFriend} />
          </>
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
