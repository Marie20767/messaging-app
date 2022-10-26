import styled from 'styled-components';
import NewFriendWelcomeMessage from '../../../images/new-friend-welcome-message.png';

const EmptyMessagesThread = ({ title1, title2 }) => {
  return (
    <StyledEmptyMessagesThreadContainer>
      <h3>{title1}</h3>
      <h3>{title2}</h3>
      <img src={NewFriendWelcomeMessage} alt="Waving bear" />
    </StyledEmptyMessagesThreadContainer>
  );
};

const StyledEmptyMessagesThreadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  h3 {
    padding-bottom: 10px;
  }

  img {
    height: 70px;
    margin-top: 5px;
  }
`;

export default EmptyMessagesThread;
