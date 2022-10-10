import styled from 'styled-components';
import MessagesHeader from './ActiveMessagesHeader';
import Messages from './Messages';
import MessageInputField from './MessageInputField';

const ActiveMessagesThread = ({ users, currentUserId, activeFriendId, activeMessagesThread, messagesEndRef }) => {
  return (
    <StyledMessagesThreadContainer>
      <MessagesHeader
        users={users}
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
