/* eslint-disable radix */
import React, { useEffect, useState } from 'react';
import User from './User';
import SearchBox from './SearchBox';

// TODO: style the error page

const HomeScreen = ({ error, handleErrorMessage }) => {
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeUserId, setActiveUserId] = useState(null);
  const [currentUserId] = useState(parseInt(localStorage.getItem('current-user-id')));

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await fetch('http://localhost:3001/users');
        const userResults = await response.json();

        const allUsersMinusNewRegisteredUser = userResults.filter((user) => user.id !== currentUserId);

        setUsers(allUsersMinusNewRegisteredUser);
      } catch (e) {
        handleErrorMessage(e);
      }
    };

    getUserData();
  }, []);

  const onClickDeleteUser = async (id) => {
    try {
      await fetch(`http://localhost:3001/users/${id}`, { method: 'DELETE' });

      const updatedUsers = users.filter((user) => user.id !== id);

      setUsers(updatedUsers);
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
            activeUserId={activeUserId}
            setActiveUserId={setActiveUserId}
            onClickDeleteUser={onClickDeleteUser} />
        );
      })}

      {searchResult.length === 0 && isSearching
        ? <p>{`No result for '${searchInput}'`}</p>
        : null
      }
    </div>
  );
};

export default HomeScreen;
