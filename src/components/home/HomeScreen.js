/* eslint-disable radix */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DemoUser from './DemoUser';
import SearchBox from './SearchBox';
import { allAvatars } from '../../constants/constants';

// TODO: If there is something in local storage log in the user automatically and bring them to home page
// Restrict access to home screen if not logged in (currently I can just type /home and get there)

const HomeScreen = ({ serverError, currentUser, handleServerErrorMessage }) => {
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeUserId, setActiveUserId] = useState(null);

  // Note - we'll use this in some way in the future to login the user when they refresh the page
  // const [currentUserId] = useState(parseInt(localStorage.getItem('current-user-id')));

  const { id, name, avatarId } = currentUser;

  console.log('>>> currentUser: ', currentUser);

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

  if (serverError) {
    return (
      <p>{serverError}</p>
    );
  }

  const usersToDisplay = isSearching ? searchResult : users;

  const currentUserAvatar = allAvatars.find((avatar) => avatar.id === avatarId);

  return (
    <div>
      <StyledHomePageHeader>
        <img src={currentUserAvatar.animal} alt="your user avatar" className="current-user-avatar" />
        <p>Hi {name}!</p>
      </StyledHomePageHeader>
      <SearchBox
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setSearchResult={setSearchResult}
        setIsSearching={setIsSearching}
        onChangeSearchInputGetSearchResults={onChangeSearchInputGetSearchResults} />

      {usersToDisplay.map((user) => {
        return (
          <DemoUser
            key={user.id}
            id={user.id}
            avatarId={user.avatar_id}
            name={user.name}
            activeUserId={activeUserId}
            setActiveUserId={setActiveUserId} />
        );
      })}

      {searchResult.length === 0 && isSearching
        ? <p>{`No result for '${searchInput}'`}</p>
        : null
      }
    </div>
  );
};

const StyledHomePageHeader = styled.div`
display: flex;
align-items: center;
margin: 20px 0px 15px 15px;

img {
  margin-right: 10px;
}

.current-user-avatar {
    height: 40px;
  }
`;

export default HomeScreen;
