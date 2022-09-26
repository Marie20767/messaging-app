import { useState } from 'react';
import styled from 'styled-components';
import MockThreadData from '../../../data/mock-thread-data';
import { demoUsersAvatars } from '../../../constants/constants';
import MessagesHeader from './ActiveMessagesHeader';
import Messages from './Messages';
import MessageInputField from './MessageInputField';

const ActiveMessagesThread = ({ users }) => {
  const [activeMessagesThread, seActiveMessagesThread] = useState(MockThreadData[0]);

  const demoUserAvatar = demoUsersAvatars.find((avatar) => {
    if (users.length > 0) {
      if (avatar.id === users[0].avatar_id) {
        return avatar;
      }
    }

    return null;
  });

  return (
    <StyledMessagesThreadContainer>
      <MessagesHeader users={users} demoUserAvatar={demoUserAvatar} />
      <Messages activeMessagesThread={activeMessagesThread} />
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
