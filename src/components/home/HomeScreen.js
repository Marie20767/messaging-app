import React, { useEffect, useState } from 'react';
import User from './User';
import SearchBox from './SearchBox';

const HomeScreen = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
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
      if (user.username.toLowerCase().includes(e.target.value.toLowerCase())) {
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
            name={user.username}
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
