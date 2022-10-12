import styled from 'styled-components';
import SmallFullScreenOverlay from '../../overlays-and-popups/SmallFullScreenOverlay';

const AddNewFriendOverlay = ({ addNewFriendError, setIsAddingNewFriend, onClickAddNewFriend }) => {
  return (
    <SmallFullScreenOverlay onClick={() => setIsAddingNewFriend(false)}>
      <h3>Would you like to add this friend to your contact list?</h3>
      {addNewFriendError !== null
        ? <p className="error-message">{addNewFriendError}</p>
        : null
      }
      <StyledButtonsContainer>
        <button type="button" onClick={() => setIsAddingNewFriend(false)}>No</button>
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
