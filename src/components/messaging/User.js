import { useState } from 'react';
import styled from 'styled-components';

const User = ({
  name,
  email,
  id,
  editedUserId,
  setEditedUserId,
  activeUserId,
  setActiveUserId,
  onClickSaveEditedUser,
  onClickDeleteUser,
}) => {
  const [userName, setUserName] = useState(name);
  const [userEmail, setUserEmail] = useState(email);

  const userContainerClassName = activeUserId === id ? 'active-user' : 'non-active-user';

  console.log('>>> activeUserId: ', activeUserId);
  console.log('>>> id: ', id);

  return (
    <StyledUserContainer onClick={() => setActiveUserId(id)} className={userContainerClassName}>
      {editedUserId === id
        ? (
          <div>
            <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
            <input type="text" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
            <button type="button" onClick={() => onClickSaveEditedUser(userName, userEmail, id)}>Save user</button>
          </div>
        )
        : (
          <div>
            <h2>{userName}</h2>
            <p>{userEmail}</p>
            <button type="button" onClick={() => setEditedUserId(id)}>Update user</button>
          </div>
        )
      }
      <button type="button" onClick={() => onClickDeleteUser(id)}>Delete user</button>
    </StyledUserContainer>
  );
};

const StyledUserContainer = styled.div`
  &.active-user {
    background-color: #e9e9e9;;
  }

  &.non-active-user {
    background-color: transparent;
  }
`;

export default User;

