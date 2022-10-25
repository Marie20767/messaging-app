import io from 'socket.io-client';
import styled from 'styled-components';
import SmallFullScreenOverlay from '../../overlays-and-popups/SmallFullScreenOverlay';

const AddNewFriendOverlay = ({
  id,
  nonFriendUsers,
  messageThreads,
  setMessageThreads,
  friends,
  setFriends,
  activeNewFriendId,
  addNewFriendError,
  setActiveNewFriendId,
  setAddNewFriendError,
  setActiveFriendId,
  setAddNewFriendSearchInput,
  setNewFriendSearchResult,
  setClickedAddNewFriend,
  setNewFriendUserNameExists,
}) => {
  const socket = io.connect('http://localhost:3001');

  const onClickAddNewFriend = async () => {
    try {
      const response = await fetch('http://localhost:3001/add_friend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: id,
          friend_id: activeNewFriendId,
        }),
      });

      const newFriendResult = await response.json();

      if (!newFriendResult.error) {
        const newFriend = nonFriendUsers.find((user) => user.id === activeNewFriendId);

        // Make new friend join a new room with currentUser
        socket.emit('join_room', { sending_user_id: id, recipient_user_id: newFriend.id });

        const newFriends = [
          newFriend,
          ...friends,
        ];

        setFriends(newFriends);
        setAddNewFriendError(null);
        setActiveFriendId(activeNewFriendId);
        setActiveNewFriendId(null);
        setAddNewFriendSearchInput('');
        setNewFriendSearchResult([]);
        setClickedAddNewFriend(false);
        setNewFriendUserNameExists(false);

        setMessageThreads([
          ...messageThreads,
          {
            friendParticipantId: newFriendResult.friend_id,
            threadId: newFriendResult.thread_id,
            messages: [],
          },
        ]);
      } else {
        setAddNewFriendError(newFriendResult.error);
      }
    } catch (e) {
      console.log(e);
      setAddNewFriendError('Friend could not be added');
    }
  };

  return (
    <SmallFullScreenOverlay onClick={() => setActiveNewFriendId(null)}>
      <h3>Would you like to add this friend to your contact list?</h3>
      {addNewFriendError !== null
        ? <p className="error-message">{addNewFriendError}</p>
        : null
      }
      <StyledButtonsContainer>
        <button type="button" onClick={() => setActiveNewFriendId(null)}>No</button>
        <button type="button" onClick={onClickAddNewFriend}>Yes</button>
      </StyledButtonsContainer>
    </SmallFullScreenOverlay>
  );
};

const StyledButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  padding: 0 170px;

  button {
    padding-left: 15px;
    padding-right: 15px;
  }
`;

export default AddNewFriendOverlay;
