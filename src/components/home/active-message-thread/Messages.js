import styled from 'styled-components';

const Messages = ({ activeMessagesThread }) => {
  return (
    <StyledMessagesContainer>
      {activeMessagesThread.messages.map((message) => {
        const messageClassName = message.senderId === '11' ? 'from-current-user' : 'from-demo-user';

        const getMinutes = () => {
          if (message.timestamp.getMinutes() < 10) {
            return `0${message.timestamp.getMinutes()}`;
          }

          return message.timestamp.getMinutes();
        };

        return (
          <StyledMessageContainer key={message.id} className={messageClassName}>
            <p className="text">{message.text}</p>
            <p className="timestamp">{`${message.timestamp.getHours()}:${getMinutes()}`}</p>
          </StyledMessageContainer>
        );
      })}
    </StyledMessagesContainer>
  );
};

const StyledMessagesContainer = styled.div`
  overflow-y: scroll;
  display: flex;
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

  &.from-demo-user {
    background-color: #e7e6e6;
    align-self: flex-start;
  }

  &.from-current-user {
    align-self: flex-end;
    background-color: #9dbbf8a9;
  }
`;

export default Messages;
