import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Loading } from 'react-loading-dot/lib';
import ChangeAvatarOverlay from './sidebar/ChangeAvatarOverlay';
import ActiveMessagesThread from './active-message-thread/ActiveMessagesThread';
import Sidebar from './sidebar/Sidebar';
import { getFormattedMessageThreads } from '../../utils/utils';

const HomeScreen = ({ currentUser, setCurrentUser }) => {
  const [users, setUsers] = useState([]);
  const [activeFriendId, setActiveFriendId] = useState(1); // TODO: at some point need to change this, make it so it's always the ID of the friend that sent the last message
  const [serverError, setServerError] = useState('');
  const [showAvatarOverlay, setShowAvatarOverlay] = useState(false);
  const [messageThreads, setMessageThreads] = useState(null);
  const [activeMessagesThread, setActiveMessagesThread] = useState(null);

  const { id, avatarId } = currentUser;
  const messagesEndRef = useRef(null);

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
      console.log('>>> onClickSaveNewAvatar error! ', e);
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
      console.log('>>> getDemoUsers error: ', e);
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
      console.log('>>> getMessageThreads error: ', e);
      setServerError('Something went wrong with your request');
    }
  };

  const getDemoUsersAndMessagesData = () => {
    getDemoUsers();
    getMessageThreads();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    getDemoUsersAndMessagesData();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [activeMessagesThread]);

  if (serverError && !showAvatarOverlay) {
    return (
      <div className="full-screen-error-container">
        <h2>{serverError}</h2>
        <button type="button" onClick={getDemoUsersAndMessagesData}>Retry</button>
      </div>
    );
  }

  if (!users.length || !messageThreads) {
    return (
      <div className="card-container">
        <Loading background="#ea738dff" margin="8px" size="18px" duration="0.6s" />
      </div>
    );
  }

  return (
    <StyledHomeScreenContainer>
      <Sidebar
        users={users}
        currentUser={currentUser}
        activeFriendId={activeFriendId}
        messageThreads={messageThreads}
        setActiveFriendId={setActiveFriendId}
        setCurrentUser={setCurrentUser}
        setShowAvatarOverlay={setShowAvatarOverlay}
        setActiveMessagesThread={setActiveMessagesThread} />

      <ActiveMessagesThread
        users={users}
        currentUserId={id}
        activeFriendId={activeFriendId}
        activeMessagesThread={activeMessagesThread}
        messagesEndRef={messagesEndRef} />
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
