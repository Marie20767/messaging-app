import styled from 'styled-components';
import moment from 'moment';
import { useEffect, useRef } from 'react';
import MessagesHeader from './ActiveMessagesHeader';
import Messages from './Messages';
import MessageInputField from './MessageInputField';
import EmptyMessagesThread from './EmptyMessagesThread';
import { getSocket } from '../../../utils/socket-io';
import { handleActiveMessagesScroll } from '../../../utils/utils';

const ActiveMessagesThread = ({
  friends,
  currentUserId,
  activeFriendId,
  messageThreads,
  isSearching,
  activeSearchResultIds,
  newMessageInput,
  setNewMessageInput,
  setMessageThreads,
  isActiveMessageThreadShowing,
  updateIsActiveMessageThreadShowing,
}) => {
  if (!messageThreads.length) {
    return <EmptyMessagesThread title1="No friends here yet..." title2="Don&apos;t be shy, add a friend first!" />;
  }

  const messagesEndRef = useRef(null);

  const scrollToBottom = (delay = 0) => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, delay);
  };

  useEffect(() => {
    const onResize = () => {
      scrollToBottom(200);
    };

    window.visualViewport.addEventListener('resize', onResize);

    return () => {
      window.visualViewport.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    handleActiveMessagesScroll(isSearching, activeSearchResultIds, scrollToBottom);
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

    setMessageThreads(updatedMessages);
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
        friends={friends}
        activeFriendId={activeFriendId}
        updateIsActiveMessageThreadShowing={updateIsActiveMessageThreadShowing} />
      <Messages
        activeMessagesThread={activeMessagesThread}
        currentUserId={currentUserId}
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
