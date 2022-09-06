import { useState } from 'react';

const User = ({ name, email, id, editedUserId, setEditedUserId, onClickSaveEditedUser, onClickDeleteUser }) => {
  const [userName, setUserName] = useState(name);
  const [userEmail, setUserEmail] = useState(email);

  return (
    <div>
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
    </div>
  );
};

export default User;
