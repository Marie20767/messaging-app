import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Loading } from 'react-loading-dot/lib';
import io from 'socket.io-client';
import moment from 'moment';
import ChangeAvatarOverlay from './sidebar/ChangeAvatarOverlay';
import ActiveMessagesThread from './active-message-thread/ActiveMessagesThread';
import Sidebar from './sidebar/Sidebar';
import { getFormattedMessageThreads, getFriendsSortedByMessageSent } from '../../utils/utils';
import AddNewFriendOverlay from './sidebar/AddNewFriendOverlay';

const socket = io.connect('http://localhost:3001');

const HomeScreen = ({ currentUser, setCurrentUser }) => {
  const [friends, setFriends] = useState(null);
  const [nonFriendUsers, setNonFriendUsers] = useState([]);
  const [activeFriendId, setActiveFriendId] = useState(null);
  const [activeNewFriendId, setActiveNewFriendId] = useState(null);
  const [showAvatarOverlay, setShowAvatarOverlay] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [messageThreads, setMessageThreads] = useState(null);
  const [addNewFriendSearchInput, setAddNewFriendSearchInput] = useState('');
  const [newFriendSearchResult, setNewFriendSearchResult] = useState([]);
  const [clickedAddNewFriend, setClickedAddNewFriend] = useState(false);
  const [newFriendUserNameExists, setNewFriendUserNameExists] = useState(false);
  const [addNewFriendError, setAddNewFriendError] = useState(null);
  const [serverError, setServerError] = useState('');
  const [activeSearchResultIds, setActiveSearchResultIds] = useState(null);
  const [newMessageInput, setNewMessageInput] = useState('');

  const { id, avatarId } = currentUser;
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!isSearching || activeSearchResultIds?.friendId) {
      scrollToBottom();
    }
  }, [activeFriendId, isSearching, activeSearchResultIds, messageThreads]);

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

      if (!friendResults.length) {
        setNonFriendUsers(userResults);
      } else {
        const usersMinusFriends = userResults.filter((userResult) => {
          if (userResult.id === id || friendResults.some((friendResult) => friendResult.id === userResult.id)) {
            return false;
          }

          return true;
        });

        setNonFriendUsers(usersMinusFriends);
      }
    } catch (e) {
      console.log('>>> getNonFriends error: ', e);
      setServerError('Something went wrong with your request');
    }
  };

  const getFriends = async (formattedMessageThreads) => {
    try {
      const response = await fetch(`http://localhost:3001/friends/${id}`);
      const friendResults = await response.json();

      setFriends(friendResults);
      getNonFriendUsers(friendResults);

      if (!friendResults.length) {
        setActiveFriendId(null);
      } else {
        // Make each friend join a room with the currentUser
        friendResults.forEach((friend) => {
          socket.emit('join_room', { sending_user_id: id, recipient_user_id: friend.id });
        });

        const sortedFriends = getFriendsSortedByMessageSent(formattedMessageThreads, friendResults);

        setActiveFriendId(sortedFriends[0].id);
      }
    } catch (e) {
      console.log('>>> getFriends error: ', e);
      setServerError('Something went wrong with your request');
    }
  };

  const getMessageThreadsAndFriends = async () => {
    try {
      const response = await fetch(`http://localhost:3001/messages/${id}`);
      const messageThreadsResults = await response.json();

      if (!messageThreadsResults.length) {
        setMessageThreads(messageThreadsResults);
      } else {
        const formattedMessageThreadsResults = getFormattedMessageThreads(messageThreadsResults, id);

        getFriends(formattedMessageThreadsResults);

        setMessageThreads(formattedMessageThreadsResults);
      }
    } catch (e) {
      console.log('>>> getMessageThreadsAndFriends error: ', e);
      setServerError('Something went wrong with your request');
    }
  };

  const getFriendsAndMessagesData = () => {
    // getFriends();
    getMessageThreadsAndFriends();
  };

  useEffect(() => {
    getFriendsAndMessagesData();
  }, []);

  useEffect(() => {
    const onReceiveMessage = (data) => {
      const updatedMessageThreads = messageThreads.map((messageThread) => {
        if (messageThread.friendParticipantId === data.sending_user_id) {
          messageThread.messages.push({
            id: moment().toISOString(),
            ...data,
          });
        }

        return messageThread;
      });

      setMessageThreads(updatedMessageThreads);
    };

    // Listen to receive message event to check when you've received a new message
    socket.on('receive_message', onReceiveMessage);

    return () => {
      socket.off('receive_message', onReceiveMessage);
    };
  }, [messageThreads]);

  if (serverError && !showAvatarOverlay) {
    return (
      <div className="full-screen-error-container">
        <h2>{serverError}</h2>
        <button type="button" onClick={getFriendsAndMessagesData}>Retry</button>
      </div>
    );
  }

  if (!friends || !messageThreads) {
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
        activeSearchResultIds={activeSearchResultIds}
        setActiveSearchResultIds={setActiveSearchResultIds}
        addNewFriendSearchInput={addNewFriendSearchInput}
        setAddNewFriendSearchInput={setAddNewFriendSearchInput}
        newFriendSearchResult={newFriendSearchResult}
        setNewFriendSearchResult={setNewFriendSearchResult}
        clickedAddNewFriend={clickedAddNewFriend}
        setClickedAddNewFriend={setClickedAddNewFriend}
        newFriendUserNameExists={newFriendUserNameExists}
        setNewFriendUserNameExists={setNewFriendUserNameExists}
        messageThreads={messageThreads}
        isSearching={isSearching}
        setIsSearching={setIsSearching}
        setActiveFriendId={setActiveFriendId}
        setCurrentUser={setCurrentUser}
        setShowAvatarOverlay={setShowAvatarOverlay}
        setAddNewFriendError={setAddNewFriendError} />

      <ActiveMessagesThread
        friends={friends}
        currentUserId={id}
        activeFriendId={activeFriendId}
        messageThreads={messageThreads}
        messagesEndRef={messagesEndRef}
        newMessageInput={newMessageInput}
        setNewMessageInput={setNewMessageInput}
        setMessageThreads={setMessageThreads} />

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
            messageThreads={messageThreads}
            setMessageThreads={setMessageThreads}
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
