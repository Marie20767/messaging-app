import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Loading } from 'react-loading-dot/lib';
import moment from 'moment';
import { useSelector } from 'react-redux';

import ChangeAvatarOverlay from './sidebar/ChangeAvatarOverlay';
import ActiveMessagesThread from './active-message-thread/ActiveMessagesThread';
import Sidebar from './sidebar/Sidebar';
import AddNewFriendOverlay from './sidebar/AddNewFriendOverlay';

import {
  getFormattedMessageThreads,
  getFriendsSortedByMessageSent,
  getIsRead,
  isLargeScreen,
  onUpdateReadMessages,
  sanitiseArray,
} from '../../utils/utils';
import { getSocket } from '../../utils/socket-io';
import { APIPath } from '../../constants/constants';
import useOutsideClick from '../../hooks/useOutsideClick';

const HomeScreen = () => {
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
  const [serverError, setServerError] = useState(null);
  const [activeSearchResultIds, setActiveSearchResultIds] = useState(null);
  const [newMessageInput, setNewMessageInput] = useState('');
  const [isActiveMessageThreadShowing, setIsActiveMessageThreadShowing] = useState(isLargeScreen());
  const [showSettingsPopUpMenu, setShowSettingsPopUpMenu] = useState(false);

  const { currentUser: { id: currentUserId } } = useSelector((state) => state.user);

  const sortedFriends = getFriendsSortedByMessageSent(messageThreads, friends);

  const updateIsActiveMessageThreadShowing = (value) => {
    if (!isLargeScreen()) {
      setIsActiveMessageThreadShowing(value);
    } else {
      setIsActiveMessageThreadShowing(true);
    }
  };

  const getNonFriendUsers = async (friendResults) => {
    try {
      // Already get all the users that are not in the friend list so when currentUser looks for a new friend, the data is already there
      const response = await fetch(`${APIPath}/users`);
      const userResults = await response.json();

      const usersMinusFriends = userResults.filter((userResult) => {
        if (userResult.id === currentUserId || sanitiseArray(friendResults).some((friendResult) => friendResult.id === userResult.id)) {
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

  const getFriends = async (formattedMessageThreads) => {
    try {
      const response = await fetch(`${APIPath}/friends/${currentUserId}`);
      const friendResults = await response.json();

      setFriends(friendResults);
      getNonFriendUsers(friendResults);

      if (!friendResults.length) {
        setActiveFriendId(null);
      } else {
        // Make each friend join a room with the currentUser
        friendResults.forEach((friend) => {
          getSocket().emit('join_room', { sending_user_id: currentUserId, recipient_user_id: friend.id });
        });

        // Sort friends according to last message sent
        const sortedFriendsResults = getFriendsSortedByMessageSent(formattedMessageThreads, friendResults);

        setActiveFriendId(sortedFriendsResults[0].id);

        if (isActiveMessageThreadShowing) {
          onUpdateReadMessages(sortedFriendsResults[0].id, formattedMessageThreads, setMessageThreads);
        }
      }
    } catch (e) {
      console.log('>>> getFriends error: ', e);
      setServerError('Something went wrong with your request');
    }
  };

  const getFriendsAndMessagesData = async () => {
    try {
      const response = await fetch(`${APIPath}/messages/${currentUserId}`);
      const messageThreadsResults = await response.json();

      const sanitisedMessageThreads = messageThreadsResults || [];

      const formattedMessageThreadsResults = getFormattedMessageThreads(sanitisedMessageThreads, currentUserId);

      getFriends(formattedMessageThreadsResults);

      setMessageThreads(formattedMessageThreadsResults);
    } catch (e) {
      console.log('>>> getMessageThreadsAndFriends error: ', e);
      setServerError('Something went wrong with your request');
    }
  };

  const onClickRetry = () => {
    setServerError(null);
    getFriendsAndMessagesData();
  };

  useEffect(() => {
    // Make the current user join the add_friend_room so that when they add a friend, the friend
    // doesn't have to refresh the page and get the data from the back end to see the new chat
    getSocket().emit('join_add_friend_room', { current_user_id: currentUserId });
    getFriendsAndMessagesData();
  }, []);

  useEffect(() => {
    const onReceiveMessage = async (data) => {
      const updatedMessageThreads = messageThreads.map((messageThread) => {
        if (messageThread.friendParticipantId === data.sending_user_id) {
          messageThread.messages.push({
            ...data,
            id: moment().toISOString(),
            // if friend we received message from is activeFriend then all messages should be read on front end unless it's in mobile view
            read: getIsRead(messageThread, isActiveMessageThreadShowing, activeFriendId),
          });
        }

        return messageThread;
      });

      setMessageThreads(updatedMessageThreads);

      if (data.sending_user_id === activeFriendId) {
        try {
          await fetch(`${APIPath}/update_message_read`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              thread_id: data.threadId,
            }),
          });
        } catch (e) {
          console.log('>>> setActiveFriendMessageToRead! ', e);
        }
      }
    };

    // Listen to receive message event to check when you've received a new message
    getSocket().on('receive_message', onReceiveMessage);

    return () => {
      // Stop listening to receive_message event when messageThreads change to ensure
      // the onReceiveMessage function always has the latest messageThreads
      getSocket().off('receive_message', onReceiveMessage);
    };
  }, [messageThreads, activeFriendId, isActiveMessageThreadShowing]);

  useOutsideClick(() => {
    setShowSettingsPopUpMenu(false);
  }, 'current-user-avatar', [setShowSettingsPopUpMenu]);

  if (serverError && !showAvatarOverlay) {
    return (
      <div className="full-screen-error-container">
        <h2>{serverError}</h2>
        <button type="button" onClick={onClickRetry} className="full-screen-error-button">Retry</button>
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
        friends={sortedFriends}
        setFriends={setFriends}
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
        setMessageThreads={setMessageThreads}
        isSearching={isSearching}
        setIsSearching={setIsSearching}
        setActiveFriendId={setActiveFriendId}
        setShowAvatarOverlay={setShowAvatarOverlay}
        setAddNewFriendError={setAddNewFriendError}
        isActiveMessageThreadShowing={isActiveMessageThreadShowing}
        updateIsActiveMessageThreadShowing={updateIsActiveMessageThreadShowing}
        showSettingsPopUpMenu={showSettingsPopUpMenu}
        setShowSettingsPopUpMenu={setShowSettingsPopUpMenu}
        getNonFriendUsers={getNonFriendUsers} />

      <ActiveMessagesThread
        friends={friends}
        activeFriendId={activeFriendId}
        messageThreads={messageThreads}
        isSearching={isSearching}
        activeSearchResultIds={activeSearchResultIds}
        newMessageInput={newMessageInput}
        setNewMessageInput={setNewMessageInput}
        setMessageThreads={setMessageThreads}
        isActiveMessageThreadShowing={isActiveMessageThreadShowing}
        updateIsActiveMessageThreadShowing={updateIsActiveMessageThreadShowing} />

      {showAvatarOverlay
        ? (
          <ChangeAvatarOverlay
            setShowAvatarOverlay={setShowAvatarOverlay}
            serverError={serverError}
            setServerError={setServerError} />
        )
        : null
      }
      {activeNewFriendId !== null
        ? (
          <AddNewFriendOverlay
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
  height: 100%;
  display: flex;
  width: 100%;
  overflow: hidden;
`;

export default HomeScreen;
