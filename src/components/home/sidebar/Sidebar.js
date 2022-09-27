import styled from 'styled-components';
import { useState } from 'react';
import SearchBox from './SearchBox';
import { allAvatars } from '../../../constants/constants';
import SettingsPopUpMenu from './SettingsPopUpMenu';
import DemoUserDisplay from './DemoUserDisplay';

const Sidebar = ({
  isSearching,
  users,
  currentUser,
  searchResult,
  activeUserId,
  setActiveUserId,
  setSearchResult,
  setCurrentUser,
  setIsSearching,
  searchInput,
  setSearchInput,
  setShowAvatarOverlay,
}) => {
  const [showSettingsPopUpMenu, setShowSettingsPopUpMenu] = useState(false);

  const usersToDisplay = isSearching ? searchResult : users;
  const { name, avatarId } = currentUser;

  const currentUserAvatar = allAvatars.find((avatar) => avatar.id === avatarId);

  const onChangeSearchInputGetSearchResults = (e) => {
    setIsSearching(true);
    setSearchInput(e.target.value);

    const usersMatchingSearchInput = users.filter((user) => {
      if (user.name.toLowerCase().includes(e.target.value.toLowerCase())) {
        return user;
      }

      return null;
    });

    setSearchResult(usersMatchingSearchInput);
  };

  return (
    <StyledSidebarContainer>
      <StyledHomePageHeader>
        <StyledNameAndAvatarContainer>
          <img
            src={currentUserAvatar.animal}
            alt="your user avatar"
            className="current-user-avatar clickable"
            onClick={() => setShowSettingsPopUpMenu(!showSettingsPopUpMenu)} />
          <p className="current-user-name">Hi {name}!</p>
        </StyledNameAndAvatarContainer>
        {showSettingsPopUpMenu
          ? (
            <SettingsPopUpMenu
              setShowSettingsPopUpMenu={setShowSettingsPopUpMenu}
              setCurrentUser={setCurrentUser}
              setShowAvatarOverlay={setShowAvatarOverlay} />
          )
          : null
        }

        <SearchBox
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          setSearchResult={setSearchResult}
          setIsSearching={setIsSearching}
          onChangeSearchInputGetSearchResults={onChangeSearchInputGetSearchResults} />
      </StyledHomePageHeader>

      <StyledDemoUsersContainer>
        {usersToDisplay.map((user) => {
          return (
            <DemoUserDisplay
              key={user.id}
              id={user.id}
              avatarId={user.avatar_id}
              name={user.name}
              activeUserId={activeUserId}
              setActiveUserId={setActiveUserId} />
          );
        })}

        {searchResult.length === 0 && isSearching
          ? <p className="no-search-result">{`No result for '${searchInput}'`}</p>
          : null
        }
      </StyledDemoUsersContainer>
    </StyledSidebarContainer>
  );
};

const StyledSidebarContainer = styled.div`
  width: 400px; 
  background-color: #f8f7f7;
  border-right: 1px solid #e9e9e9;

  .no-search-result {
    margin: 10px 0 0 15px;
  }

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

const StyledNameAndAvatarContainer = styled.div`
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

const StyledDemoUsersContainer = styled.div`
  overflow-y: scroll;
  height: 84vh;
`;

export default Sidebar;
