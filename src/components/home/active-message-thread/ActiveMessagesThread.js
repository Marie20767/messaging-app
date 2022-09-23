import { useState } from 'react';
import styled from 'styled-components';
import MockThreadData from '../../../data/mock-thread-data';
import { demoUsersAvatars } from '../../../constants/constants';
import MessagesHeader from './ActiveMessagesHeader';
import Messages from './Messages';


// TODO: make an inout at the bottom that is fixed to type in the Message
// Make the header fixed at the top like the sidebar name and avatar

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
    </StyledMessagesThreadContainer>
  );
};

const StyledMessagesThreadContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 25px 15px 15px;
  height: 100vh;
  overflow-y: scroll;
`;

export default ActiveMessagesThread;
