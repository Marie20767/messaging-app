import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Loading } from 'react-loading-dot/lib';
import ChangeAvatarOverlay from './sidebar/ChangeAvatarOverlay';
import ActiveMessagesThread from './active-message-thread/ActiveMessagesThread';
import Sidebar from './sidebar/Sidebar';
import { getFormattedMessageThreads } from '../../utils/utils';
import AddNewFriendOverlay from './sidebar/AddNewFriendOverlay';

const HomeScreen = ({ currentUser, setCurrentUser }) => {
  const [friends, setFriends] = useState([]);
  const [activeFriendId, setActiveFriendId] = useState(1); // TODO: at some point need to change this, make it so it's always the ID of the friend that sent the last message
  const [serverError, setServerError] = useState('');
  const [showAvatarOverlay, setShowAvatarOverlay] = useState(false);
  const [messageThreads, setMessageThreads] = useState(null);
  const [activeMessagesThread, setActiveMessagesThread] = useState(null);
  const [isAddingNewFriend, setIsAddingNewFriend] = useState(false);

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

  const getFriends = async () => {
    try {
      const response = await fetch(`http://localhost:3001/friends/${id}`);
      const friendResults = await response.json();

      setFriends(friendResults);
    } catch (e) {
      console.log('>>> getFriends error: ', e);
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

  const getFriendsAndMessagesData = () => {
    getFriends();
    getMessageThreads();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    getFriendsAndMessagesData();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [activeMessagesThread]);

  if (serverError && !showAvatarOverlay) {
    return (
      <div className="full-screen-error-container">
        <h2>{serverError}</h2>
        <button type="button" onClick={getFriendsAndMessagesData}>Retry</button>
      </div>
    );
  }

  if (!friends.length || !messageThreads) {
    return (
      <div className="card-container">
        <Loading background="#ea738dff" margin="8px" size="18px" duration="0.6s" />
      </div>
    );
  }

  return (
    <StyledHomeScreenContainer>
      <Sidebar
        friends={friends}
        currentUser={currentUser}
        activeFriendId={activeFriendId}
        messageThreads={messageThreads}
        setActiveFriendId={setActiveFriendId}
        setCurrentUser={setCurrentUser}
        setShowAvatarOverlay={setShowAvatarOverlay}
        setActiveMessagesThread={setActiveMessagesThread}
        setIsAddingNewFriend={setIsAddingNewFriend} />

      <ActiveMessagesThread
        friends={friends}
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
      {isAddingNewFriend
        ? (
          <AddNewFriendOverlay setIsAddingNewFriend={setIsAddingNewFriend} />
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
