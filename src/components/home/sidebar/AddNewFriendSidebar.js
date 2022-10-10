/* eslint-disable react/jsx-no-useless-fragment */
import { useState } from 'react';
import styled from 'styled-components';
import ContactSearchResults from './search/ContactSearchResults';
import SearchResultsHeader from './search/SearchResultsHeader';

const AddNewFriendSidebar = ({
  isSearchingForNewFriend,
  searchInput,
  friendSearchResult,
  friendUserNameExists,
  clickedAddNewFriend,
  activeNewFriendId,
  setActiveNewFriendId,
  searchResultNewFriendSelected,
  setSearchResultNewFriendSelected,
}) => {
  const [isAddingNewFriend, setIsAddingNewFriend] = useState(false);

  const noSearchResultText = `User called '${searchInput}' doesn't exist. Ask your friend to register first.`;

  const onClickSelectFriend = (friendId) => {
    setActiveNewFriendId(friendId);
    setSearchResultNewFriendSelected(true);
    setIsAddingNewFriend(true);
  };

  return (
    <StyledAddNewFriendSidebarContainer>
      <SearchResultsHeader
        title="Add Friend"
        searchInput={searchInput}
        clickedAddNewFriend={clickedAddNewFriend}
        friendUserNameExists={friendUserNameExists}
        variableExists={friendUserNameExists}
        friendSearchResult={friendSearchResult}
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
