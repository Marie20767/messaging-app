import React, { useEffect, useState } from 'react';
import './App.css';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import User from './User';
import AddNewUser from './AddNewUser';

const App = () => {
  // TODO: When you search for a username that doesn't exist and you backspace, it is still console logging
  // no users so you can't find any users anymore (e.g. Jamiexxx and then backspace to Jamie, can't find any user)
  // make the search case insensitive
  // put search box into separate component
  // Add logic for xmark

  // TODO: style the search box with a magnifying glass icon (have a div with background and in that div have the icon and a search box)
  // Have it so the cursor focuses on the search box like with Signal no matter where you click on the div

  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [editedUserId, setEditedUserId] = useState(0);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await fetch('http://localhost:3001/users');
        const userResults = await response.json();

        setUsers(userResults);
      } catch (e) {
        console.log(e);
        setError('Something went wrong with your request');
      }
    };

    getUserData();
  }, []);

  const handleErrorMessage = (e) => {
    console.log(e);
    setError('Something went wrong with your request');
  };

  const onClickSaveNewUser = async (name, email) => {
    try {
      await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
    } catch (e) {
      handleErrorMessage(e);
    }
  };

  const onClickDeleteUser = async (id) => {
    try {
      await fetch(`http://localhost:3001/users/${id}`, { method: 'DELETE' });

      const updatedUsers = users.filter((user) => user.id !== id);

      setUsers(updatedUsers);
    } catch (e) {
      handleErrorMessage(e);
    }
  };

  const onClickSaveEditedUser = async (name, email, id) => {
    setEditedUserId(0);

    try {
      await fetch(`http://localhost:3001/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
    } catch (e) {
      handleErrorMessage(e);
    }
  };

  const onChangeSearchInputGetSearchResults = (e) => {
    setSearchInput(e.target.value);

    const searchResult = users.filter((user) => {
      if (user.name.includes(e.target.value)) {
        return user;
      }

      return null;
    });

    setUsers(searchResult);
  };

  console.log(users);

  if (error) {
    return (
      <p>{error}</p>
    );
  }

  return (
    <div>
      <input type="text" placeholder="Search" onChange={(e) => onChangeSearchInputGetSearchResults(e)} />
      {searchInput !== ''
        ? <FontAwesomeIcon icon={faXmark} />
        : null
            }
      {users.map((user) => {
        return (
          <User
            key={user.id}
            id={user.id}
            name={user.name}
            email={user.email}
            editedUserId={editedUserId}
            setEditedUserId={setEditedUserId}
            onClickSaveEditedUser={onClickSaveEditedUser}
            onClickDeleteUser={onClickDeleteUser} />
        );
      })}

      {users.length === 0
        ? <p>{`No result for '${searchInput}'`}</p>
        : null}

      <StyledAddUserContainer>
        {isAddingUser
          ? (
            <AddNewUser
              newUsername={newUsername}
              newUserEmail={newUserEmail}
              setNewUsername={setNewUsername}
              setNewUserEmail={setNewUserEmail}
              onClickSaveNewUser={onClickSaveNewUser} />
          )
          : <button type="button" onClick={() => setIsAddingUser(true)}>Add user</button>
              }
      </StyledAddUserContainer>
    </div>
  );
};

const StyledAddUserContainer = styled.div`
  margin-top: 50px;
`;

export default App;
