import moment from 'moment';
import styled from 'styled-components';
import { getSortedMessages } from '../../../utils/utils';
import EmptyMessagesThread from './EmptyMessagesThread';
import Message from './Message';

const Messages = ({ activeMessagesThread, currentUserId, messagesEndRef }) => {
  const filteredActiveMessages = activeMessagesThread?.messages?.filter((message) => message.text !== '');

  if (!filteredActiveMessages?.length) {
    return <EmptyMessagesThread title1="No messages here yet..." title2="Don&apos;t be shy, send a message!" />;
  }

  const messagesGroupedByDateSent = {};

  const sortedActiveMessages = getSortedMessages(filteredActiveMessages);

  for (let i = 0; i < sortedActiveMessages.length; i++) {
    const message = sortedActiveMessages[i];
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
                currentUserId={currentUserId} />
            );
          }

          return (
            <Message
              key={message.id}
              message={message}
              currentUserId={currentUserId} />
          );
        });
      })}
      <div ref={messagesEndRef} />
    </StyledMessagesContainer>
  );
};

const StyledMessagesContainer = styled.div`
  overflow-y: scroll;
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 0px 25px 0px 15px;
  display: flex;
  margin-bottom: calc(20px + env(keyboard-inset-height));

  h4 {
    font-size: 13px;
    align-items: center;
    justify-content: center;
  }
`;

export default Messages;
