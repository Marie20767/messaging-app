import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';

const HomeScreen = ({ serverError, currentUser, handleServerErrorMessage }) => {
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeUserId, setActiveUserId] = useState(null);

  const { id } = currentUser;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await fetch('http://localhost:3001/users');
        const userResults = await response.json();

        const allUsersMinusNewRegisteredUser = userResults.filter((user) => user.id !== id);

        setUsers(allUsersMinusNewRegisteredUser);
      } catch (e) {
        handleServerErrorMessage(e);
      }
    };

    getUserData();
  }, []);

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

  // TODO: add a button here 'Retry', when clicked it calls getUserData again
  if (serverError) {
    return (
      <p>{serverError}</p>
    );
  }

  return (
    <StyledHomeScreenContainer>
      <Sidebar
        isSearching={isSearching}
        users={users}
        currentUser={currentUser}
        activeUserId={activeUserId}
        setActiveUserId={setActiveUserId}
        searchResult={searchResult}
        setSearchResult={setSearchResult}
        setIsSearching={setIsSearching}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        onChangeSearchInputGetSearchResults={onChangeSearchInputGetSearchResults} />
    </StyledHomeScreenContainer>
  );
};

const StyledHomeScreenContainer = styled.div`
  height: 100%;
`;
export default HomeScreen;
