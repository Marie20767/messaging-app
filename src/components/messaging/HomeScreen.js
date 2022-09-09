import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import User from './User';
import AddNewUser from './AddNewUser';
import SearchBox from './SearchBox';

const HomeScreen = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [editedUserId, setEditedUserId] = useState(0);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeUserId, setActiveUserId] = useState(null);

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
    setIsSearching(true);
    setSearchInput(e.target.value);

    const usersMatchingSearchInput = users.filter((user) => {
      if (user.name.toLowerCase().includes(e.target.value.toLowerCase())) {
        return user;
      }

      return null;
    });

    setSearchResult(usersMatchingSearchInput);
  };

  if (error) {
    return (
      <p>{error}</p>
    );
  }

  const usersToDisplay = isSearching ? searchResult : users;

  return (
    <div>
      <SearchBox
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setSearchResult={setSearchResult}
        setIsSearching={setIsSearching}
        onChangeSearchInputGetSearchResults={onChangeSearchInputGetSearchResults} />

      {usersToDisplay.map((user) => {
        return (
          <User
            key={user.id}
            id={user.id}
            name={user.name}
            email={user.email}
            editedUserId={editedUserId}
            setEditedUserId={setEditedUserId}
            activeUserId={activeUserId}
            setActiveUserId={setActiveUserId}
            onClickSaveEditedUser={onClickSaveEditedUser}
            onClickDeleteUser={onClickDeleteUser} />
        );
      })}

      {searchResult.length === 0 && isSearching
        ? <p>{`No result for '${searchInput}'`}</p>
        : null
      }

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

export default HomeScreen;
