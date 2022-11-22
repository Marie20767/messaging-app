import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useInterval } from '../../../hooks/useInterval';
import { checkIfMessageSentMoreThanOneHourAgo } from '../../../utils/utils';
import MessageDateContainer from './MessageDateContainer';
import MessageTimestamp from './MessageTimestamp';

const Message = ({ message, isFirstMessage, date, currentUserId }) => {
  const [timestampKey, setTimestampKey] = useState(`${Date.now()}`);
  const [isMoreThanAnHourAgo, setIsMoreThanAnHourAgo] = useState(checkIfMessageSentMoreThanOneHourAgo(message));

  const messageFromClassName = message.sending_user_id === currentUserId ? 'from-current-user' : 'from-friend';
  const messageIdClassName = `message-container-${message.id}`;

  // Every minute, the messages should re-render to update the timestamp if message is less than 1 hour ago
  const intervalIdRef = useInterval(() => {
    setIsMoreThanAnHourAgo(checkIfMessageSentMoreThanOneHourAgo(message));

    setTimestampKey(`${Date.now()}`);
  }, 60000);

  useEffect(() => {
    if (isMoreThanAnHourAgo) {
      clearInterval(intervalIdRef.current);
    }
  }, [isMoreThanAnHourAgo]);

  return (
    <>
      {isFirstMessage
        ? <MessageDateContainer date={date} message={message} />
        : null
      }
      <StyledMessageContainer className={`${messageFromClassName} ${messageIdClassName}`} key={message.id}>
        <p className="text">{message.text}</p>
        <MessageTimestamp key={timestampKey} isMoreThanAnHourAgo={isMoreThanAnHourAgo} message={message} />
      </StyledMessageContainer>
    </>
  );
};

const StyledMessageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  margin-top: 20px;
  padding: 15px;
  max-width: 90%;

  @media screen and (min-width: 1024px) {
    max-width: 70%;
  }

  .timestamp {
      font-size: 11px;
      margin-left: 7px;
      width: 30px;
      align-self: center;
      text-align: center;
    }

  &.from-friend {
    background-color: #e7e6e6;
    align-self: flex-start;
  }

  &.from-current-user {
    align-self: flex-end;
    background-color: #9dbbf8a9;
  }

  &.scrolled-to-message {
    background-color: rgba(0, 0, 0, 0.2)
  }
`;

export default Message;
