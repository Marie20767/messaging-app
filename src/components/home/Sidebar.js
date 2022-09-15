import styled from 'styled-components';
import { useState } from 'react';
import DemoUser from './DemoUser';
import SearchBox from './SearchBox';
import { allAvatars } from '../../constants/constants';
import SettingsOverlay from './SettingsOverlay';

// TODO: Finish overlay

const Sidebar = ({
  isSearching,
  users,
  currentUser,
  searchResult,
  activeUserId,
  setActiveUserId,
  setSearchResult,
  setIsSearching,
  searchInput,
  setSearchInput,
  onChangeSearchInputGetSearchResults,
}) => {
  const [showSettingsOverlay, setShowSettingsOverlay] = useState(false);

  const usersToDisplay = isSearching ? searchResult : users;
  const { name, avatarId } = currentUser;

  const currentUserAvatar = allAvatars.find((avatar) => avatar.id === avatarId);

  return (
    <StyledSidebarContainer>
      <StyledHomePageHeader>
        <img
          src={currentUserAvatar.animal}
          alt="your user avatar"
          className="current-user-avatar clickable"
          onClick={() => setShowSettingsOverlay(!showSettingsOverlay)} />
        <p>Hi {name}!</p>
      </StyledHomePageHeader>
      {showSettingsOverlay
        ? <SettingsOverlay />
        : null
      }
      <SearchBox
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setSearchResult={setSearchResult}
        setIsSearching={setIsSearching}
        onChangeSearchInputGetSearchResults={onChangeSearchInputGetSearchResults} />

      {usersToDisplay.map((user) => {
        return (
          <DemoUser
            key={user.id}
            id={user.id}
            avatarId={user.avatar_id}
            name={user.name}
            activeUserId={activeUserId}
            setActiveUserId={setActiveUserId} />
        );
      })}

      {searchResult.length === 0 && isSearching
        ? <p>{`No result for '${searchInput}'`}</p>
        : null
      }
    </StyledSidebarContainer>
  );
};

const StyledSidebarContainer = styled.div`
  z-index: -1;
  width: 500px;
  height: 100%;
  border-right: 1px solid #e9e9e9;
`;

const StyledHomePageHeader = styled.div`
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

export default Sidebar;
