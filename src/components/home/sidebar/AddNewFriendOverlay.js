import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { APIPath } from '../../../constants/constants';
import {
  setActiveFriendId,
  setActiveNewFriendId,
  setFriends,
  setMessageThreads,
} from '../../../redux/user';
import { getSocket } from '../../../utils/socket-io';

import SmallFullScreenOverlay from '../../overlays-and-popups/SmallFullScreenOverlay';

const AddNewFriendOverlay = ({
  addNewFriendError,
  setAddNewFriendError,
  setAddNewFriendSearchInput,
  setNewFriendSearchResult,
  setClickedAddNewFriend,
  setNewFriendUserNameExists,
}) => {
  const {
    currentUser,
    friends,
    nonFriendUsers,
    activeNewFriendId,
    messageThreads,
  } = useSelector((state) => state.user);
  const { id: currentUserId } = currentUser;

  const dispatch = useDispatch();

  const onClickAddNewFriend = async () => {
    try {
      const response = await fetch(`${APIPath}/add_friend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: currentUserId,
          friend_id: activeNewFriendId,
        }),
      });

      const newFriendResult = await response.json();

      if (!newFriendResult.error) {
        const newFriend = nonFriendUsers.find((user) => user.id === activeNewFriendId);

        // Make new friend join a new room with currentUser
        getSocket().emit('join_room', { sending_user_id: currentUserId, recipient_user_id: newFriend.id });

        const newFriendEmptyMessageThread = {
          friendParticipantId: newFriendResult.friend_id,
          threadId: newFriendResult.thread_id,
          messages: [{
            text: '',
            timestamp: moment().toISOString(),
            sending_user_id: newFriendResult.friend_id,
            recipient_user_id: currentUserId,
            read: true,
          }],
        };

        // To make sure the friend that got added sees the new chat without having to refresh and
        // get data from the back end
        getSocket().emit('add_friend', {
          current_user: currentUser,
          new_friend_id: newFriend.id,
          // set the friendParticipantId to the current user id because this gets sent to the friend
          // that was added and inserted into their message threads
          message_thread: {
            ...newFriendEmptyMessageThread,
            friendParticipantId: currentUserId,
          },
        });

        const newFriends = [
          newFriend,
          ...friends,
        ];

        dispatch(setFriends(newFriends));
        setAddNewFriendError(null);
        dispatch(setActiveFriendId(activeNewFriendId));
        dispatch(setActiveNewFriendId(null));
        setAddNewFriendSearchInput('');
        setNewFriendSearchResult([]);
        setClickedAddNewFriend(false);
        setNewFriendUserNameExists(false);

        dispatch(setMessageThreads([
          ...messageThreads,
          newFriendEmptyMessageThread,
        ]));
      } else {
        setAddNewFriendError(newFriendResult.error);
      }
    } catch (e) {
      console.log(e);
      setAddNewFriendError('Friend could not be added');
    }
  };

  return (
    <SmallFullScreenOverlay onClick={() => dispatch(setActiveNewFriendId(null))}>
      <h3 className="add-friend-overlay-title">Would you like to add this friend to your contact list?</h3>
      {addNewFriendError !== null
        ? <p className="error-message">{addNewFriendError}</p>
        : null
      }
      <StyledButtonsContainer>
        <button type="button" onClick={() => dispatch(setActiveNewFriendId(null))} className="no-button">Cancel</button>
        <button type="button" onClick={onClickAddNewFriend}>Confirm</button>
      </StyledButtonsContainer>
    </SmallFullScreenOverlay>
  );
};

const StyledButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;

  button {
    padding: 5px 10px; 
  }

  .no-button {
    margin-right: 20px;
  }

  @media screen and (min-width: 768px) {

    button {
      padding-left: 15px;
      padding-right: 15px;
    }
  }
`;

export default AddNewFriendOverlay;
