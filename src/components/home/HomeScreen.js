import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ChangeAvatarOverlay from './sidebar/ChangeAvatarOverlay';
import ActiveMessagesThread from './active-message-thread/ActiveMessagesThread';
import Sidebar from './sidebar/Sidebar';
import { getFormattedMessageThreads } from '../../utils/utils';

const HomeScreen = ({ currentUser, setCurrentUser }) => {
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeUserId, setActiveUserId] = useState('1');
  const [serverError, setServerError] = useState('');
  const [showAvatarOverlay, setShowAvatarOverlay] = useState(false);
  const [messageThreads, setMessageThreads] = useState(null);
  const [activeMessagesThread, setActiveMessagesThread] = useState(null);

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

  const getDemoUsers = async () => {
    try {
      const response = await fetch('http://localhost:3001/users');
      const userResults = await response.json();

      const allUsersMinusNewRegisteredUser = userResults.filter((user) => user.id !== id);

      setUsers(allUsersMinusNewRegisteredUser);
    } catch (e) {
      setServerError('Something went wrong with your request');
    }
  };

  const getMessageThreads = async () => {
    try {
      const response = await fetch(`http://localhost:3001/messages/${id}`);
      const messageThreadsResults = await response.json();
      const formattedMessageThreadsResults = getFormattedMessageThreads(messageThreadsResults, id);

      setMessageThreads(formattedMessageThreadsResults);
      setActiveMessagesThread(formattedMessageThreadsResults[0]);
    } catch (e) {
      setServerError('Something went wrong with your request');
    }
  };

  const getDemoUsersAndMessagesData = () => {
    getDemoUsers();
    getMessageThreads();
  };

  useEffect(() => {
    getDemoUsersAndMessagesData();
  }, []);

  if (serverError && !showAvatarOverlay) {
    return (
      <div className="full-screen-error-container">
        <h2>{serverError}</h2>
        <button type="button" onClick={getDemoUsersAndMessagesData}>Retry</button>
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
        messageThreads={messageThreads}
        setActiveUserId={setActiveUserId}
        searchResult={searchResult}
        setSearchResult={setSearchResult}
        setCurrentUser={setCurrentUser}
        setIsSearching={setIsSearching}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setShowAvatarOverlay={setShowAvatarOverlay}
        setActiveMessagesThread={setActiveMessagesThread} />
      <ActiveMessagesThread
        users={users}
        currentUserId={id}
        activeUserId={activeUserId}
        activeMessagesThread={activeMessagesThread} />
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
  display: flex;
`;

export default HomeScreen;
