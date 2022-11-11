import styled from 'styled-components';
import MessagesHeader from './ActiveMessagesHeader';
import Messages from './Messages';
import MessageInputField from './MessageInputField';
import EmptyMessagesThread from './EmptyMessagesThread';
import { onHandleSendingNewMessage } from '../../../utils/utils';

const ActiveMessagesThread = ({
  friends,
  currentUserId,
  activeFriendId,
  messageThreads,
  messagesEndRef,
  newMessageInput,
  setNewMessageInput,
  setMessageThreads,
  showActiveMessagesMobile,
  setShowActiveMessagesMobile,
}) => {
  if (!messageThreads.length) {
    return <EmptyMessagesThread title1="No friends here yet..." title2="Don&apos;t be shy, add a friend first!" />;
  }

  const activeMessagesThread = messageThreads.find((thread) => thread.friendParticipantId === activeFriendId);

  const onClickSendMessage = () => {
    if (newMessageInput !== '') {
      onHandleSendingNewMessage(activeMessagesThread, currentUserId, activeFriendId, newMessageInput, messageThreads, setMessageThreads, setNewMessageInput);
    }
  };

  const onEnterSendMessage = (e) => {
    if (e.keyCode === 13 && !e.shiftKey && newMessageInput !== '') {
      onHandleSendingNewMessage(activeMessagesThread, currentUserId, activeFriendId, newMessageInput, messageThreads, setMessageThreads, setNewMessageInput);
      e.preventDefault();
    }
  };

  return (
    <StyledMessagesThreadContainer className={showActiveMessagesMobile ? 'shown' : 'hidden'}>
      <MessagesHeader
        friends={friends}
        activeFriendId={activeFriendId}
        setShowActiveMessagesMobile={setShowActiveMessagesMobile} />
      <Messages
        activeMessagesThread={activeMessagesThread}
        currentUserId={currentUserId}
        messagesEndRef={messagesEndRef} />
      <MessageInputField
        onClickSendMessage={onClickSendMessage}
        setNewMessageInput={setNewMessageInput}
        newMessageInput={newMessageInput}
        onKeyDown={onEnterSendMessage} />
    </StyledMessagesThreadContainer>
  );
};

const StyledMessagesThreadContainer = styled.div`
  &.hidden {
    display: none;
  }

  &.shown {
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: space-between;
  }

  @media screen and (min-width: 768px) {
    overflow: hidden;

    &.hidden {
      overflow-y: scroll;
      display: flex;
      flex-direction: column;
      flex: 1;
      justify-content: space-between;
    }
  }
`;

export default ActiveMessagesThread;
