import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import MessagesHeader from './ActiveMessagesHeader';
import Messages from './Messages';
import MessageInputField from './MessageInputField';

const ActiveMessagesThread = ({ friends, currentUserId, activeFriendId, messageThreads }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeFriendId]);

  const activeMessagesThread = messageThreads.find((thread) => thread.friendParticipantId === activeFriendId);

  return (
    <StyledMessagesThreadContainer>
      <MessagesHeader
        friends={friends}
        activeFriendId={activeFriendId} />
      <Messages
        activeMessagesThread={activeMessagesThread}
        currentUserId={currentUserId}
        messagesEndRef={messagesEndRef} />
      <MessageInputField />
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
