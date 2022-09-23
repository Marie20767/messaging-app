import styled from 'styled-components';

const Messages = ({ activeMessagesThread }) => {
  return (
    <>
      {activeMessagesThread.messages.map((message) => {
        const messageClassName = message.senderId === '11' ? 'from-current-user' : 'from-demo-user';

        const getMinutes = () => {
          if (message.timestamp.getMinutes() < 10) {
            return `0${message.timestamp.getMinutes()}`;
          }

          return message.timestamp.getMinutes();
        };

        return (
          <StyledMessageContentContainer key={message.id} className={messageClassName}>
            <p className="text">{message.text}</p>
            <p className="timestamp">{`${message.timestamp.getHours()}:${getMinutes()}`}</p>
          </StyledMessageContentContainer>
        );
      })}
    </>
  );
};

const StyledMessageContentContainer = styled.div`
  display: flex;
  max-width: 70%;
  border-radius: 10px;
  margin-top: 30px;
  padding: 15px;
  justify-content: space-between;
  align-items: flex-end;

  .timestamp {
      font-size: 12px;
      margin-left: 7px;
    }

  &.from-demo-user {
    background-color: #e7e6e6;
  }

  &.from-current-user {
    align-self: flex-end;
    background-color: #9dbbf8a9;
  }

`;

export default Messages;
