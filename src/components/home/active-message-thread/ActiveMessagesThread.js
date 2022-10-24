import styled from 'styled-components';
import io from 'socket.io-client';
import moment from 'moment';
import MessagesHeader from './ActiveMessagesHeader';
import Messages from './Messages';
import MessageInputField from './MessageInputField';

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
  const socket = io.connect('http://localhost:3001');

  const activeMessagesThread = messageThreads.find((thread) => thread.friendParticipantId === activeFriendId);

  const handleEnterKeySendMessage = (e) => {
    const newMessageInfo = {
      thread_id: activeMessagesThread.messages[0].thread_id,
      sending_user_id: currentUserId,
      recipient_user_id: activeFriendId,
      text: newMessageInput,
      timestamp: moment().toISOString(),
    };

    if (e.keyCode === 13) {
      socket.emit('send_message', { ...newMessageInfo });

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

  return (
    <StyledMessagesThreadContainer>
      <MessagesHeader
        friends={friends}
        activeFriendId={activeFriendId} />
      <Messages
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
