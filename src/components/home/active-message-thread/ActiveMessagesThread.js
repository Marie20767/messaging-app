import styled from 'styled-components';
import MessagesHeader from './ActiveMessagesHeader';
import Messages from './Messages';
import MessageInputField from './MessageInputField';

const ActiveMessagesThread = ({ users, currentUserId, activeUserId, activeMessagesThread }) => {
  return (
    <StyledMessagesThreadContainer>
      <MessagesHeader
        users={users}
        activeUserId={activeUserId}
        activeMessagesThread={activeMessagesThread} />
      <Messages
        activeMessagesThread={activeMessagesThread}
        currentUserId={currentUserId} />
      <MessageInputField />
    </StyledMessagesThreadContainer>
  );
};

const StyledMessagesThreadContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
`;

export default ActiveMessagesThread;
