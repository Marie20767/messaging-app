import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Loading } from 'react-loading-dot/lib';
import ChangeAvatarOverlay from './sidebar/ChangeAvatarOverlay';
import ActiveMessagesThread from './active-message-thread/ActiveMessagesThread';
import Sidebar from './sidebar/Sidebar';
import { getFormattedMessageThreads } from '../../utils/utils';
import AddNewFriendOverlay from './sidebar/AddNewFriendOverlay';

// TODO: remove activeMessagesThread as a state variable, calculate it in the ActiveMessagesThread component instead
// Make sure to remove all references to setActiveMessagesThread
// then check to see if this fixes the bug where you add Draco, select Hermione then select Draco (because activeMessageThread state
// isn't getting reset to null here then it breaks, but if you calculate activeMessageThread using messageThreads and activeFriendId then
// the only things that need to be set are these bits of state)

// Lesson here - if you can 'derive' a particular bit of state from some state that already exists then don't create another state for it

const HomeScreen = ({ currentUser, setCurrentUser }) => {
  const [friends, setFriends] = useState([]);
  const [nonFriendUsers, setNonFriendUsers] = useState([]);
  const [activeFriendId, setActiveFriendId] = useState(1); // TODO: at some point need to change this, make it so it's always the ID of the friend that sent the last message
  const [serverError, setServerError] = useState('');
  const [showAvatarOverlay, setShowAvatarOverlay] = useState(false);
  const [messageThreads, setMessageThreads] = useState(null);
  const [activeMessagesThread, setActiveMessagesThread] = useState(null);
  const [isAddingNewFriend, setIsAddingNewFriend] = useState(false);
  const [activeNewFriendId, setActiveNewFriendId] = useState(null);
  const [addNewFriendError, setAddNewFriendError] = useState(null);
  const [addNewFriendSearchInput, setAddNewFriendSearchInput] = useState('');
  const [isSearchingForNewFriend, setIsSearchingForNewFriend] = useState(false);
  const [newFriendSearchResult, setNewFriendSearchResult] = useState([]);
  const [searchResultNewFriendSelected, setSearchResultNewFriendSelected] = useState(false);
  const [clickedAddNewFriend, setClickedAddNewFriend] = useState(false);
  const [newFriendUserNameExists, setNewFriendUserNameExists] = useState(false);

  console.log('>>> activeFriendId: ', activeFriendId);
  console.log('>>> messageThreads: ', messageThreads);
  console.log('>>> activeMessagesThread: ', activeMessagesThread);

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

      const hasMessageThread = formattedMessageThreadsResults.some((messageThread) => messageThread.friendParticipantId === activeFriendId);

      if (hasMessageThread) {
        setActiveMessagesThread(formattedMessageThreadsResults[0]);
      } else {
        setActiveMessagesThread(null);
      }
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

  const onClickCloseNewFriendSearch = () => {
    setAddNewFriendSearchInput('');
    setIsSearchingForNewFriend(false);
    setNewFriendSearchResult([]);
    setIsAddingNewFriend(false);
    // TODO: change this
    setActiveFriendId(1);
    setActiveNewFriendId(null);
    setSearchResultNewFriendSelected(false);
    setClickedAddNewFriend(false);
    setNewFriendUserNameExists(false);
  };

  const onClickAddNewFriend = async () => {
    try {
      const response = await fetch('http://localhost:3001/add_friend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: id,
          friend_id: activeNewFriendId,
        }),
      });

      const newFriendResult = await response.json();

      if (!newFriendResult.error) {
        const newFriend = nonFriendUsers.find((user) => user.id === activeNewFriendId);

        const newFriends = [
          newFriend,
          ...friends,
        ];

        setFriends(newFriends);
        setAddNewFriendError(null);
        setActiveFriendId(activeNewFriendId);
        setAddNewFriendSearchInput('');
        setIsSearchingForNewFriend(false);
        setNewFriendSearchResult([]);
        setSearchResultNewFriendSelected(false);
        setClickedAddNewFriend(false);
        setNewFriendUserNameExists(false);
        setIsAddingNewFriend(false);
        setActiveMessagesThread(null);
        console.log('>>> SET ACTIVE THREAD TO NUll!!');
      } else {
        setAddNewFriendError(newFriendResult.error);
      }
    } catch (e) {
      console.log(e);
      setAddNewFriendError('Friend could not be added');
    }
  };

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
        isSearchingForNewFriend={isSearchingForNewFriend}
        setIsSearchingForNewFriend={setIsSearchingForNewFriend}
        newFriendSearchResult={newFriendSearchResult}
        setNewFriendSearchResult={setNewFriendSearchResult}
        searchResultNewFriendSelected={searchResultNewFriendSelected}
        setSearchResultNewFriendSelected={setSearchResultNewFriendSelected}
        clickedAddNewFriend={clickedAddNewFriend}
        setClickedAddNewFriend={setClickedAddNewFriend}
        newFriendUserNameExists={newFriendUserNameExists}
        setNewFriendUserNameExists={setNewFriendUserNameExists}
        messageThreads={messageThreads}
        setActiveFriendId={setActiveFriendId}
        setCurrentUser={setCurrentUser}
        setShowAvatarOverlay={setShowAvatarOverlay}
        setActiveMessagesThread={setActiveMessagesThread}
        setIsAddingNewFriend={setIsAddingNewFriend}
        setAddNewFriendError={setAddNewFriendError}
        onClickCloseNewFriendSearch={onClickCloseNewFriendSearch} />

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
          <AddNewFriendOverlay
            addNewFriendError={addNewFriendError}
            setIsAddingNewFriend={setIsAddingNewFriend}
            onClickAddNewFriend={onClickAddNewFriend} />
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
