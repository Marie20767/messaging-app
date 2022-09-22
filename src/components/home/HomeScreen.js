import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ChangeAvatarOverlay from './ChangeAvatarOverlay';
import Sidebar from './Sidebar';

const HomeScreen = ({ currentUser, setCurrentUser }) => {
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeUserId, setActiveUserId] = useState(null);
  const [serverError, setServerError] = useState('');
  const [showAvatarOverlay, setShowAvatarOverlay] = useState(false);

  const { id, avatarId } = currentUser;

  const onClickSaveNewAvatar = async (newAvatarId) => {
    try {
      const response = await fetch(`http://localhost:3001/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          avatar_id: newAvatarId,
        }),
      });
      const result = await response.json();

      if (!result.error) {
        setCurrentUser({
          ...currentUser,
          avatarId: newAvatarId,
        });

        setShowAvatarOverlay(false);
      }
    } catch (e) {
      setServerError('Something went wrong with your request');
    }
  };

  const getUserData = async () => {
    try {
      const response = await fetch('http://localhost:3001/users');
      const userResults = await response.json();

      const allUsersMinusNewRegisteredUser = userResults.filter((user) => user.id !== id);

      setUsers(allUsersMinusNewRegisteredUser);
    } catch (e) {
      setServerError('Something went wrong with your request');
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

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

  if (serverError && !showAvatarOverlay) {
    return (
      <div className="full-screen-error-container">
        <h2>{serverError}</h2>
        <button type="button" className="home-screen-server-error-button" onClick={getUserData}>Retry</button>
      </div>
    );
  }

  return (
    <StyledHomeScreenContainer>
      <Sidebar
        isSearching={isSearching}
        users={users}
        currentUser={currentUser}
        activeUserId={activeUserId}
        setActiveUserId={setActiveUserId}
        searchResult={searchResult}
        setSearchResult={setSearchResult}
        setCurrentUser={setCurrentUser}
        setIsSearching={setIsSearching}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setShowAvatarOverlay={setShowAvatarOverlay}
        onChangeSearchInputGetSearchResults={onChangeSearchInputGetSearchResults} />
      {showAvatarOverlay
        ? (
          <ChangeAvatarOverlay
            setShowAvatarOverlay={setShowAvatarOverlay}
            avatarId={avatarId}
            serverError={serverError}
            onClickSaveNewAvatar={onClickSaveNewAvatar} />
        )
        : null
        }
    </StyledHomeScreenContainer>
  );
};

const StyledHomeScreenContainer = styled.div`
  min-height: 100%;
`;

export default HomeScreen;
