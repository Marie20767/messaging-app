import styled from 'styled-components';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { allAvatars } from '../../../constants/constants';
import SettingsPopUpMenu from './SettingsPopUpMenu';
import FriendsAndSearchSidebar from './FriendsAndSearchSidebar';
import SearchBox from './search/SearchBox';
import AddNewFriendSidebar from './AddNewFriendSidebar';

const Sidebar = ({
  friends,
  currentUser,
  activeFriendId,
  activeNewFriendId,
  setActiveNewFriendId,
  addNewFriendSearchInput,
  setAddNewFriendSearchInput,
  newFriendSearchResult,
  setNewFriendSearchResult,
  clickedAddNewFriend,
  setClickedAddNewFriend,
  newFriendUserNameExists,
  setNewFriendUserNameExists,
  activeSearchResultIds,
  setActiveSearchResultIds,
  nonFriendUsers,
  messageThreads,
  setActiveFriendId,
  isSearching,
  setIsSearching,
  setCurrentUser,
  setShowAvatarOverlay,
  setAddNewFriendError,
}) => {
  const [showSettingsPopUpMenu, setShowSettingsPopUpMenu] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [friendSearchResult, setFriendSearchResult] = useState([]);
  const [friendUserNameExists, setFriendUserNameExists] = useState(false);
  const [messageExists, setMessageExists] = useState(false);
  const [messageThreadsSearchResults, setMessageThreadSearchResults] = useState([]);

  const { name, avatarId } = currentUser;

  const currentUserAvatar = allAvatars.find((avatar) => avatar.id === avatarId);

  const onChangeSearchInputGetSearchResults = (e) => {
    setSearchInput(e.target.value);

    if (e.target.value === '') {
      setIsSearching(false);
      setFriendUserNameExists(false);
    } else {
      setIsSearching(true);

      const friendsMatchingSearchInput = friends.filter((user) => {
        return user.name.toLowerCase().includes(e.target.value.toLowerCase());
      });

      setFriendUserNameExists(friendsMatchingSearchInput.length > 0);
      setFriendSearchResult(friendsMatchingSearchInput);

      const messageThreadsMatchingSearchInput = messageThreads.reduce((acc, currentMessageThread) => {
        const filteredMessages = currentMessageThread.messages.filter((message) => message.text.toLowerCase().includes(e.target.value.toLowerCase()));

        return [
          ...acc,
          ...filteredMessages,
        ];
      }, []);

      setMessageExists(messageThreadsMatchingSearchInput.length > 0);
      setMessageThreadSearchResults(messageThreadsMatchingSearchInput);
    }
  };

  const onChangeSearchInputAddNewFriendGetSearchResults = (e) => {
    setAddNewFriendSearchInput(e.target.value);

    if (nonFriendUsers.length > 0) {
      const friendsMatchingSearchInput = nonFriendUsers.filter((user) => {
        return user.name.toLowerCase().includes(e.target.value.toLowerCase());
      });

      setNewFriendUserNameExists(friendsMatchingSearchInput?.length > 0);
      setNewFriendSearchResult(friendsMatchingSearchInput);
    } else {
      setNewFriendUserNameExists(false);
    }
  };

  const onClickCloseSearch = () => {
    setSearchInput('');
    setFriendSearchResult([]);
    setIsSearching(false);
    setActiveFriendId(friends[0].id);
    setActiveSearchResultIds(null);
  };

  const onClickCloseNewFriendSearch = () => {
    setAddNewFriendSearchInput('');
    setNewFriendSearchResult([]);
    setActiveFriendId(friends[0].id);
    setActiveNewFriendId(null);
    setClickedAddNewFriend(false);
    setNewFriendUserNameExists(false);
  };

  return (
    <StyledSidebarContainer>
      <StyledHomePageHeader>
        <StyledCurrentUserContainer>
          <StyledAvatarAndNameContainer>
            <img
              src={currentUserAvatar.animal}
              alt="your user avatar"
              className="current-user-avatar clickable"
              onClick={() => setShowSettingsPopUpMenu(!showSettingsPopUpMenu)} />
            <h4 className="current-user-name">Hi {name}!</h4>
          </StyledAvatarAndNameContainer>
          <div>
            <FontAwesomeIcon
              icon={faUserPlus}
              fontSize="18px"
              className="clickable"
              onClick={() => setClickedAddNewFriend(true)} />
          </div>
        </StyledCurrentUserContainer>

        {showSettingsPopUpMenu
          ? (
            <SettingsPopUpMenu
              setShowSettingsPopUpMenu={setShowSettingsPopUpMenu}
              setCurrentUser={setCurrentUser}
              setShowAvatarOverlay={setShowAvatarOverlay} />
          )
          : null
        }

        {clickedAddNewFriend
          ? (
            <>
              <StyledBackHomeContainer className="clickable" onClick={onClickCloseNewFriendSearch}>
                <FontAwesomeIcon icon={faChevronLeft} className="back-home-icon" />
                <h3 className="small-black-title">Back home</h3>
              </StyledBackHomeContainer>
              <SearchBox
                autoFocus
                searchInput={addNewFriendSearchInput}
                placeholder="Search by username"
                onClickCloseSearch={onClickCloseNewFriendSearch}
                onChange={onChangeSearchInputAddNewFriendGetSearchResults} />
            </>
          )
          : (
            <SearchBox
              searchInput={searchInput}
              placeholder="Search"
              onClickCloseSearch={onClickCloseSearch}
              onChange={onChangeSearchInputGetSearchResults} />
          )
        }
      </StyledHomePageHeader>

      <StyledFriendsContainer>
        {!clickedAddNewFriend
          ? (
            <FriendsAndSearchSidebar
              friends={friends}
              currentUser={currentUser}
              isSearching={isSearching}
              friendSearchResult={friendSearchResult}
              friendUserNameExists={friendUserNameExists}
              messageExists={messageExists}
              messageThreadsSearchResults={messageThreadsSearchResults}
              searchInput={searchInput}
              activeFriendId={activeFriendId}
              setActiveFriendId={setActiveFriendId}
              activeSearchResultIds={activeSearchResultIds}
              setActiveSearchResultIds={setActiveSearchResultIds}
              messageThreads={messageThreads} />
          )
          : (
            <AddNewFriendSidebar
              searchInput={addNewFriendSearchInput}
              friendSearchResult={newFriendSearchResult}
              friendUserNameExists={newFriendUserNameExists}
              activeNewFriendId={activeNewFriendId}
              setActiveNewFriendId={setActiveNewFriendId}
              setAddNewFriendError={setAddNewFriendError} />
          )
        }
      </StyledFriendsContainer>

    </StyledSidebarContainer>
  );
};

const StyledSidebarContainer = styled.div`
  width: 400px; 
  background-color: #f8f7f7;
  border-right: 1px solid #e9e9e9;

  .current-user-name {
    font-weight: bold;
    color: #9dbbf8;
  }
`;

const StyledHomePageHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 16vh;
`;

const StyledCurrentUserContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 30px;
`;

const StyledBackHomeContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0px 15px 15px;

  .back-home-icon {
    margin-right: 5px;
  }
`;

const StyledAvatarAndNameContainer = styled.div`
  display: flex;
  align-items: center;

  padding: 20px 0px 15px 15px;

  img {
  margin-right: 10px;
  }

  .current-user-avatar {
    height: 40px;
  }
`;

const StyledFriendsContainer = styled.div`
  overflow-y: scroll;
  height: 84vh;

  .search-result-title {
    margin: 30px 0 20px 15px;
  }

  .no-search-result {
    margin: 10px 0 20px 15px;
  }
`;

export default Sidebar;
