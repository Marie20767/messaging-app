import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Loading } from 'react-loading-dot/lib';
import moment from 'moment';
import ChangeAvatarOverlay from './sidebar/ChangeAvatarOverlay';
import ActiveMessagesThread from './active-message-thread/ActiveMessagesThread';
import Sidebar from './sidebar/Sidebar';
import { getFormattedMessageThreads, getFriendsSortedByMessageSent, onUpdateReadMessages } from '../../utils/utils';
import AddNewFriendOverlay from './sidebar/AddNewFriendOverlay';
import { getSocket } from '../../utils/socket-io';
import { APIDomain } from '../../constants/constants';

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
  const [showActiveMessagesMobile, setShowActiveMessagesMobile] = useState(false);

  const { id, avatar_id } = currentUser;
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
      const response = await fetch(`http://${APIDomain}/users/${id}`, {
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
          avatar_id: newAvatarId,
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
      // Already get all the users that are not in the friend list so when currentUser looks for a new friend, the data is already there
      const response = await fetch(`http://${APIDomain}/users`);
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
      const response = await fetch(`http://${APIDomain}/friends/${id}`);
      const friendResults = await response.json();

      setFriends(friendResults);
      getNonFriendUsers(friendResults);

      if (!friendResults.length) {
        setActiveFriendId(null);
      } else {
        // Make each friend join a room with the currentUser
        friendResults.forEach((friend) => {
          getSocket().emit('join_room', { sending_user_id: id, recipient_user_id: friend.id });
        });

        // Sort friends according to last message sent
        const sortedFriends = getFriendsSortedByMessageSent(formattedMessageThreads, friendResults);

        setActiveFriendId(sortedFriends[0].id);
        onUpdateReadMessages(sortedFriends[0].id, formattedMessageThreads, setMessageThreads);
      }
    } catch (e) {
      console.log('>>> getFriends error: ', e);
      setServerError('Something went wrong with your request');
    }
  };

  const getFriendsAndMessagesData = async () => {
    try {
      const response = await fetch(`http://${APIDomain}/messages/${id}`);
      const messageThreadsResults = await response.json();

      const sanitisedMessageThreads = messageThreadsResults || [];

      const formattedMessageThreadsResults = getFormattedMessageThreads(sanitisedMessageThreads, id);

      getFriends(formattedMessageThreadsResults);

      setMessageThreads(formattedMessageThreadsResults);
    } catch (e) {
      console.log('>>> getMessageThreadsAndFriends error: ', e);
      setServerError('Something went wrong with your request');
    }
  };

  useEffect(() => {
    // Make the current user join the add_friend_room so that when they add a friend, the friend
    // doesn't have to refresh the page and get the data from the back end to see the new chat
    getSocket().emit('join_add_friend_room', { current_user_id: id });
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
    getSocket().on('receive_message', onReceiveMessage);

    return () => {
      // Stop listening to receive_message event when messageThreads change to ensure
      // the onReceiveMessage function always has the latest messageThreads
      getSocket().off('receive_message', onReceiveMessage);
    };
  }, [messageThreads]);

  useEffect(() => {
    const onReceivedAddedAsNewFriend = (data) => {
      // Someone else has just added me as a friend
      // So now I want to put them in my friends list and add their empty messageThread
      const updatedFriends = [
        data.current_user,
        ...friends,
      ];

      setFriends(updatedFriends);
      setMessageThreads([
        ...messageThreads,
        data.message_thread,
      ]);

      if (!activeFriendId) {
        setActiveFriendId(data.current_user.id);
      }
    };
    getSocket().on('received_add_new_friend', onReceivedAddedAsNewFriend);

    return () => {
      getSocket().off('received_add_new_friend', onReceivedAddedAsNewFriend);
    };
  }, [friends, messageThreads]);

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
        setMessageThreads={setMessageThreads}
        isSearching={isSearching}
        setIsSearching={setIsSearching}
        setActiveFriendId={setActiveFriendId}
        setCurrentUser={setCurrentUser}
        setShowAvatarOverlay={setShowAvatarOverlay}
        setAddNewFriendError={setAddNewFriendError}
        showActiveMessagesMobile={showActiveMessagesMobile}
        setShowActiveMessagesMobile={setShowActiveMessagesMobile}
        getNonFriendUsers={getNonFriendUsers} />

      <ActiveMessagesThread
        friends={friends}
        currentUserId={id}
        activeFriendId={activeFriendId}
        messageThreads={messageThreads}
        messagesEndRef={messagesEndRef}
        newMessageInput={newMessageInput}
        setNewMessageInput={setNewMessageInput}
        setMessageThreads={setMessageThreads}
        showActiveMessagesMobile={showActiveMessagesMobile}
        setShowActiveMessagesMobile={setShowActiveMessagesMobile} />

      {showAvatarOverlay
        ? (
          <ChangeAvatarOverlay
            setShowAvatarOverlay={setShowAvatarOverlay}
            avatarId={avatar_id}
            serverError={serverError}
            onClickSaveNewAvatar={onClickSaveNewAvatar} />
        )
        : null
      }
      {activeNewFriendId !== null
        ? (
          <AddNewFriendOverlay
            currentUser={currentUser}
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
  width: 100%;
  overflow-x: hidden;
`;

export default HomeScreen;
