import styled from 'styled-components';
import { checkIfMessageSentMoreThanOneHourAgo, getFormattedMessageTime, getMinutesIfLessThanOneHourAgo } from '../../../utils/utils';

const Message = ({ message, currentUserId, messagesEndRef }) => {
  const messageClassName = message.sending_user_id === currentUserId ? 'from-current-user' : 'from-friend';
  const isMoreThanAnHourAgo = checkIfMessageSentMoreThanOneHourAgo(message);

  return (
    <StyledMessageContainer className={messageClassName} key={message.id}>
      <p className="text">{message.text}</p>
      {isMoreThanAnHourAgo
        ? <p className="timestamp">{getFormattedMessageTime(message)}</p>
        : <p className="timestamp">{getMinutesIfLessThanOneHourAgo(message)}</p>
      }
      <div ref={messagesEndRef} />
    </StyledMessageContainer>
  );
};

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

export default Message;
