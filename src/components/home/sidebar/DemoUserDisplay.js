import styled from 'styled-components';
import { allAvatars } from '../../../constants/constants';

const DemoUserDisplay = ({
  name,
  id,
  avatarId,
  messageThreads,
  setActiveMessagesThread,
  activeUserId,
  setActiveUserId,
}) => {
  const userContainerClassName = activeUserId === id ? 'active-user' : 'non-active-user';
  const userAvatar = allAvatars.find((avatar) => avatar.id === avatarId);

  const onClickSelectDemoUser = (demoUserId) => {
    setActiveUserId(demoUserId);

    const activeMessageThread = messageThreads.find((thread) => thread.demoUserParticipantId === parseInt(demoUserId));

    setActiveMessagesThread(activeMessageThread);
  };

  console.log('>>> messageThreads: ', messageThreads);
  console.log('>>> activeUserId: ', activeUserId);

  return (
    <StyledUserContainer onClick={() => onClickSelectDemoUser(id)} className={userContainerClassName}>
      <img src={userAvatar.animal} alt="user avatar" />
      <p>{name}</p>
    </StyledUserContainer>
  );
};

const StyledUserContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 0 15px 10px;
  margin: 0 5px 0 15px;
  cursor: pointer;

  p {
    color: black;
    font-weight: bold;
  }

  &.active-user {
    background-color: #9dbbf8a9;
    border-radius: 10px;
  }

  &.non-active-user {
    background-color: transparent;

    &:hover {
      background-color: #e7e6e6;
      border-radius: 10px;
    }
  }

  img {
    height: 50px;
    margin-right: 10px;
  }

`;

export default DemoUserDisplay;

