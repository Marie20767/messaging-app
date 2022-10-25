import React from 'eslint-plugin-import/config/react';
import moment from 'moment';
import styled from 'styled-components';
import NewFriendWelcomeMessage from '../../../images/new-friend-welcome-message.png';
import Message from './Message';

const Messages = ({ activeMessagesThread, currentUserId, messagesEndRef }) => {
  const filteredActiveMessages = activeMessagesThread?.messages?.filter((message) => message.text !== '');

  if (!filteredActiveMessages?.length) {
    return (
      <StyledEmptyMessagesThreadContainer>
        <h3>No messages here yet...</h3>
        <h3>Don&apos;t be shy, send a message!</h3>
        <img src={NewFriendWelcomeMessage} alt="Waving bear" />
      </StyledEmptyMessagesThreadContainer>
    );
  }

  const messagesGroupedByDateSent = {};

  for (let i = 0; i < filteredActiveMessages.length; i++) {
    const message = filteredActiveMessages[i];
    const messageDate = moment(message.timestamp).format('ddd ll');

    if (messagesGroupedByDateSent[messageDate]) {
      messagesGroupedByDateSent[messageDate].push(message);
    } else {
      messagesGroupedByDateSent[messageDate] = [message];
    }
  }

  const datesGroupedMessagesSent = Object.keys(messagesGroupedByDateSent);

  return (
    <StyledMessagesContainer>
      {datesGroupedMessagesSent.map((date) => {
        const messages = messagesGroupedByDateSent[date];

        return messages.map((message, index) => {
          if (index === 0) {
            return (
              <Message
                isFirstMessage
                date={date}
                key={message.id}
                message={message}
                currentUserId={currentUserId}
                messagesEndRef={messagesEndRef} />
            );
          }

          return (
            <Message
              key={message.id}
              message={message}
              currentUserId={currentUserId}
              messagesEndRef={messagesEndRef} />
          );
        });
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
  display: flex;

  h4 {
    font-size: 13px;
    align-items: center;
    justify-content: center;
  }
`;

export default Messages;
