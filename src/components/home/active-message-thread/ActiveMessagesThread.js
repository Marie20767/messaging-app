import styled from 'styled-components';
import moment from 'moment';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MessagesHeader from './ActiveMessagesHeader';
import Messages from './Messages';
import MessageInputField from './MessageInputField';
import EmptyMessagesThread from './EmptyMessagesThread';

import { getSocket } from '../../../utils/socket-io';
import { setMessageThreads } from '../../../redux/user';

const ActiveMessagesThread = ({
  activeSearchResultIds,
  newMessageInput,
  setNewMessageInput,
  isActiveMessageThreadShowing,
  updateIsActiveMessageThreadShowing,
}) => {
  const {
    currentUser: { id: currentUserId },
    activeFriendId,
    isSearching,
    messageThreads,
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  if (!messageThreads.length) {
    return <EmptyMessagesThread title1="No friends here yet..." title2="Don&apos;t be shy, add a friend first!" />;
  }

  const messagesEndRef = useRef(null);
  const isScrollingToSearchedMessageRef = useRef(false);

  const scrollToBottom = (delay = 200) => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, delay);
  };

  useEffect(() => {
    const onResize = () => {
      // Make sure scrollToBottom doesn't override scrolling to a specific message when you are searching
      // through all conversations
      if (!isScrollingToSearchedMessageRef.current) {
        scrollToBottom();
      }
    };

    window.visualViewport.addEventListener('resize', onResize);

    return () => {
      window.visualViewport.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    if (!isSearching || activeSearchResultIds?.friendId) {
      scrollToBottom();
    } else if (activeSearchResultIds?.messageId) {
      isScrollingToSearchedMessageRef.current = true;

      const messageElement = document.getElementsByClassName(`message-container-${activeSearchResultIds.messageId}`)[0];

      messageElement.scrollIntoView({ behavior: 'smooth' });
      messageElement.classList.add('scrolled-to-message');

      setTimeout(() => {
        messageElement.classList.remove('scrolled-to-message');
        isScrollingToSearchedMessageRef.current = false;
      }, 3000);
    }
  }, [activeFriendId, isSearching, activeSearchResultIds, messageThreads, isActiveMessageThreadShowing]);

  const activeMessagesThread = messageThreads.find((thread) => thread.friendParticipantId === activeFriendId);

  const onHandleSendingNewMessage = () => {
    const newMessageInfo = {
      thread_id: activeMessagesThread.threadId,
      sending_user_id: currentUserId,
      recipient_user_id: activeFriendId,
      text: newMessageInput,
      timestamp: moment().toISOString(),
      read: false,
    };

    getSocket().emit('send_message', { ...newMessageInfo });

    activeMessagesThread.messages.push({
      ...newMessageInfo,
      id: moment().toISOString(),
      read: true,
    });

    const updatedMessages = messageThreads.map((messageThread) => {
      if (messageThread.friendParticipantId === activeFriendId) {
        return activeMessagesThread;
      }

      return messageThread;
    });

    dispatch(setMessageThreads(updatedMessages));
    setNewMessageInput('');
  };

  const onClickSendMessage = () => {
    if (newMessageInput !== '') {
      onHandleSendingNewMessage();
    }
  };

  const onEnterSendMessage = (e) => {
    if (e.keyCode === 13 && !e.shiftKey && newMessageInput !== '') {
      onHandleSendingNewMessage();
      e.preventDefault();
    }
  };

  return (
    <StyledMessagesThreadContainer className={isActiveMessageThreadShowing ? 'shown' : 'hidden'}>
      <MessagesHeader
        updateIsActiveMessageThreadShowing={updateIsActiveMessageThreadShowing} />
      <Messages
        activeMessagesThread={activeMessagesThread}
        messagesEndRef={messagesEndRef} />
      <MessageInputField
        onClickSendMessage={onClickSendMessage}
        setNewMessageInput={setNewMessageInput}
        newMessageInput={newMessageInput}
        onKeyDown={onEnterSendMessage} />
    </StyledMessagesThreadContainer>
  );
};

const StyledMessagesThreadContainer = styled.div`
  &.hidden {
    display: none;
  }

  &.shown {
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: space-between;
  }

  @media screen and (min-width: 768px) {
    overflow: hidden;

    &.hidden {
      overflow-y: scroll;
      display: flex;
      flex-direction: column;
      flex: 1;
      justify-content: space-between;
    }
  }
`;

export default ActiveMessagesThread;
