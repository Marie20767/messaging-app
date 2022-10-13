import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Loading } from 'react-loading-dot/lib';
import ChangeAvatarOverlay from './sidebar/ChangeAvatarOverlay';
import ActiveMessagesThread from './active-message-thread/ActiveMessagesThread';
import Sidebar from './sidebar/Sidebar';
import { getFormattedMessageThreads } from '../../utils/utils';
import AddNewFriendOverlay from './sidebar/AddNewFriendOverlay';

const HomeScreen = ({ currentUser, setCurrentUser }) => {
  const [friends, setFriends] = useState([]);
  const [nonFriendUsers, setNonFriendUsers] = useState([]);
  const [activeFriendId, setActiveFriendId] = useState(1); // TODO: at some point need to change this, make it so it's always the ID of the friend that sent the last message
  const [activeNewFriendId, setActiveNewFriendId] = useState(null);
  const [showAvatarOverlay, setShowAvatarOverlay] = useState(false);
  const [messageThreads, setMessageThreads] = useState(null);
  const [addNewFriendSearchInput, setAddNewFriendSearchInput] = useState('');
  const [newFriendSearchResult, setNewFriendSearchResult] = useState([]);
  const [clickedAddNewFriend, setClickedAddNewFriend] = useState(false);
  const [newFriendUserNameExists, setNewFriendUserNameExists] = useState(false);
  const [addNewFriendError, setAddNewFriendError] = useState(null);
  const [serverError, setServerError] = useState('');

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
      console.log('>>> onClickSaveNewAvatar error! ', e);
      setServerError('Something went wrong with your request');
    }
  };

  const getNonFriendUsers = async (friendResults) => {
    try {
      const response = await fetch('http://localhost:3001/users');
      const userResults = await response.json();

      const usersMinusFriends = userResults.filter((userResult) => {
        if (userResult.id === id || friendResults.some((friendResult) => friendResult.id === userResult.id)) {
          return false;
        }

        return true;
      });

      setNonFriendUsers(usersMinusFriends);
    } catch (e) {
      console.log('>>> getNonFriends error: ', e);
      setServerError('Something went wrong with your request');
    }
  };

  const getFriends = async () => {
    try {
      const response = await fetch(`http://localhost:3001/friends/${id}`);
      const friendResults = await response.json();

      setFriends(friendResults);
      getNonFriendUsers(friendResults);
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
    } catch (e) {
      console.log('>>> getMessageThreads error: ', e);
      setServerError('Something went wrong with your request');
    }
  };

  const getFriendsAndMessagesData = () => {
    getFriends();
    getMessageThreads();
  };

  useEffect(() => {
    getFriendsAndMessagesData();
  }, []);

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
        nonFriendUsers={nonFriendUsers}
        activeFriendId={activeFriendId}
        activeNewFriendId={activeNewFriendId}
        setActiveNewFriendId={setActiveNewFriendId}
        addNewFriendSearchInput={addNewFriendSearchInput}
        setAddNewFriendSearchInput={setAddNewFriendSearchInput}
        newFriendSearchResult={newFriendSearchResult}
        setNewFriendSearchResult={setNewFriendSearchResult}
        clickedAddNewFriend={clickedAddNewFriend}
        setClickedAddNewFriend={setClickedAddNewFriend}
        newFriendUserNameExists={newFriendUserNameExists}
        setNewFriendUserNameExists={setNewFriendUserNameExists}
        messageThreads={messageThreads}
        setActiveFriendId={setActiveFriendId}
        setCurrentUser={setCurrentUser}
        setShowAvatarOverlay={setShowAvatarOverlay}
        setAddNewFriendError={setAddNewFriendError} />

      <ActiveMessagesThread
        friends={friends}
        currentUserId={id}
        activeFriendId={activeFriendId}
        messageThreads={messageThreads} />
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
      {activeNewFriendId !== null
        ? (
          <AddNewFriendOverlay
            id={id}
            addNewFriendError={addNewFriendError}
            nonFriendUsers={nonFriendUsers}
            friends={friends}
            setFriends={setFriends}
            activeNewFriendId={activeNewFriendId}
            setActiveNewFriendId={setActiveNewFriendId}
            setAddNewFriendError={setAddNewFriendError}
            setActiveFriendId={setActiveFriendId}
            setAddNewFriendSearchInput={setAddNewFriendSearchInput}
            setNewFriendSearchResult={setNewFriendSearchResult}
            setClickedAddNewFriend={setClickedAddNewFriend}
            setNewFriendUserNameExists={setNewFriendUserNameExists} />
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
