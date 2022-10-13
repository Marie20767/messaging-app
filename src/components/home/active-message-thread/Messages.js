import React from 'eslint-plugin-import/config/react';
import styled from 'styled-components';
import NewFriendWelcomeMessage from '../../../images/new-friend-welcome-message.png';

const Messages = ({ activeMessagesThread, currentUserId, messagesEndRef }) => {
  if (!activeMessagesThread) {
    return (
      <StyledEmptyMessagesThreadContainer>
        <h3>No messages here yet...</h3>
        <h3>Don&apos;t be shy, send a message!</h3>
        <img src={NewFriendWelcomeMessage} alt="Waving bear" />
      </StyledEmptyMessagesThreadContainer>
    );
  }

  return (
    <StyledMessagesContainer>
      {activeMessagesThread.messages.map((message) => {
        const messageClassName = message.sending_user_id === currentUserId ? 'from-current-user' : 'from-friend';

        return (
          <StyledMessageContainer className={messageClassName} key={message.id}>
            <p className="text">{message.text}</p>
            <p className="timestamp">{message.timestamp}</p>
            <div ref={messagesEndRef} />
          </StyledMessageContainer>
        );
      })}
    </StyledMessagesContainer>
  );
};

const StyledEmptyMessagesThreadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    padding-bottom: 10px;
  }

  img {
    height: 70px;
    margin-top: 5px;
  }
`;

const StyledMessagesContainer = styled.div`
  overflow-y: scroll;
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 0px 25px 0px 15px;
`;

const StyledMessageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  margin-top: 20px;
  padding: 15px;
  max-width: 70%;

  .timestamp {
      font-size: 11px;
      margin-left: 7px;
      align-self: flex-end;
    }

  &.from-friend {
    background-color: #e7e6e6;
    align-self: flex-start;
  }

  &.from-current-user {
    align-self: flex-end;
    background-color: #9dbbf8a9;
  }
`;

export default Messages;
