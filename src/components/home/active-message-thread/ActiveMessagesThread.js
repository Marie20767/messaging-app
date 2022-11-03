import styled from 'styled-components';
import moment from 'moment';
import { useState } from 'react';
import MessagesHeader from './ActiveMessagesHeader';
import Messages from './Messages';
import MessageInputField from './MessageInputField';
import EmptyMessagesThread from './EmptyMessagesThread';
import { getSocket } from '../../../utils/socket-io';
import { useInterval } from '../../../hooks/useInterval';

const ActiveMessagesThread = ({
  friends,
  currentUserId,
  activeFriendId,
  messageThreads,
  messagesEndRef,
  newMessageInput,
  setNewMessageInput,
  setMessageThreads,
}) => {
  const [messagesKey, setMessagesKey] = useState(`${Date.now()}`);

  if (!messageThreads.length) {
    return <EmptyMessagesThread title1="No friends here yet..." title2="Don&apos;t be shy, add a friend first!" />;
  }

  const activeMessagesThread = messageThreads.find((thread) => thread.friendParticipantId === activeFriendId);

  const handleEnterKeySendMessage = (e) => {
    const newMessageInfo = {
      thread_id: activeMessagesThread.threadId,
      sending_user_id: currentUserId,
      recipient_user_id: activeFriendId,
      text: newMessageInput,
      timestamp: moment().toISOString(),
      read: false,
    };

    if (e.keyCode === 13) {
      getSocket().emit('send_message', { ...newMessageInfo });

      activeMessagesThread.messages.push({ id: moment().toISOString(), ...newMessageInfo });

      const updatedMessages = messageThreads.map((messageThread) => {
        if (messageThread.friendParticipantId === activeFriendId) {
          return activeMessagesThread;
        }

        return messageThread;
      });

      setMessageThreads(updatedMessages);
      setNewMessageInput('');
    }
  };

  // Every minute, the messages should re-render to update the timestamp
  useInterval(() => {
    setMessagesKey(`${Date.now()}`);
  }, 60000);

  return (
    <StyledMessagesThreadContainer>
      <MessagesHeader
        friends={friends}
        activeFriendId={activeFriendId} />
      <Messages
        key={messagesKey}
        activeMessagesThread={activeMessagesThread}
        currentUserId={currentUserId}
        messagesEndRef={messagesEndRef} />
      <MessageInputField
        onKeyDown={handleEnterKeySendMessage}
        setNewMessageInput={setNewMessageInput}
        newMessageInput={newMessageInput} />
    </StyledMessagesThreadContainer>
  );
};

const StyledMessagesThreadContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  justify-content: space-between;
`;

export default ActiveMessagesThread;
