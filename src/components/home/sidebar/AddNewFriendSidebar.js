import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { setActiveNewFriendId } from '../../../redux/user';

import ContactSearchResults from './search/ContactSearchResults';
import SearchResultsHeader from './search/SearchResultsHeader';

const AddNewFriendSidebar = ({
  searchInput,
  friendSearchResult,
  friendUserNameExists,
  setAddNewFriendError,
}) => {
  const { activeNewFriendId } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const noSearchResultText = `User called '${searchInput}' doesn't exist or is already in your friend list.`;

  const onClickSelectFriend = (friendId) => {
    dispatch(setActiveNewFriendId(friendId));
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
  width: 100%;
`;

export default AddNewFriendSidebar;
