import styled from 'styled-components';
import { useState } from 'react';
import SearchBox from './SearchBox';
import { allAvatars } from '../../../constants/constants';
import SettingsPopUpMenu from './SettingsPopUpMenu';
import FriendDisplay from './FriendDisplay';
import { getFriendRecipient } from '../../../utils/utils';

const Sidebar = ({
  users,
  currentUser,
  friendSearchResult,
  activeFriendId,
  messageThreads,
  setActiveFriendId,
  setFriendSearchResult,
  setCurrentUser,
  searchInput,
  setSearchInput,
  setShowAvatarOverlay,
  setActiveMessagesThread,
}) => {
  const [showSettingsPopUpMenu, setShowSettingsPopUpMenu] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [friendUserNameExists, setFriendUserNameExists] = useState(false);
  const [messageExists, setMessageExists] = useState(false);
  const [messageThreadsSearchResults, setMessageThreadSearchResults] = useState([]);

  const usersToDisplay = isSearching ? friendSearchResult : users;
  const { name, avatarId } = currentUser;

  const currentUserAvatar = allAvatars.find((avatar) => avatar.id === avatarId);

  const onChangeSearchInputGetSearchResults = (e) => {
    setIsSearching(true);
    setSearchInput(e.target.value);

    const usersMatchingSearchInput = users.filter((user) => {
      return user.name.toLowerCase().includes(e.target.value.toLowerCase());
    });

    setFriendUserNameExists(usersMatchingSearchInput.length > 0);
    setFriendSearchResult(usersMatchingSearchInput);

    const messageThreadsMatchingSearchInput = messageThreads.reduce((acc, currentMessageThread) => {
      const filteredMessages = currentMessageThread.messages.filter((message) => message.text.toLowerCase().includes(e.target.value.toLowerCase()));

      return [
        ...acc,
        ...filteredMessages,
      ];
    }, []);

    setMessageExists(messageThreadsMatchingSearchInput.length > 0);
    setMessageThreadSearchResults(messageThreadsMatchingSearchInput);
  };

  console.log('>>> messageThreadsSearchResults: ', messageThreadsSearchResults);
  console.log('>>> users: ', users);

  return (
    <StyledSidebarContainer>
      <StyledHomePageHeader>
        <StyledCurrentUserContainer>
          <img
            src={currentUserAvatar.animal}
            alt="your user avatar"
            className="current-user-avatar clickable"
            onClick={() => setShowSettingsPopUpMenu(!showSettingsPopUpMenu)} />
          <h4 className="current-user-name">Hi {name}!</h4>
        </StyledCurrentUserContainer>

        {showSettingsPopUpMenu
          ? (
            <SettingsPopUpMenu
              setShowSettingsPopUpMenu={setShowSettingsPopUpMenu}
              setCurrentUser={setCurrentUser}
              setShowAvatarOverlay={setShowAvatarOverlay} />
          )
          : null
        }

        <SearchBox
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          setFriendSearchResult={setFriendSearchResult}
          setIsSearching={setIsSearching}
          onChangeSearchInputGetSearchResults={onChangeSearchInputGetSearchResults} />
      </StyledHomePageHeader>

      <StyledFriendsContainer>
        {isSearching && friendUserNameExists
          ? <h4 className="small-black-title search-result-title">Contacts</h4>
          : null
          }

        {friendSearchResult.length === 0 && isSearching && !messageExists
          ? <p className="no-search-result">{`No result for '${searchInput}'`}</p>
          : null
        }

        {usersToDisplay.map((user) => {
          return (
            <FriendDisplay
              key={user.id}
              id={user.id}
              avatarId={user.avatar_id}
              name={user.name}
              activeFriendId={activeFriendId}
              setActiveFriendId={setActiveFriendId}
              messageThreads={messageThreads}
              setActiveMessagesThread={setActiveMessagesThread} />
          );
        })}

        {messageExists && isSearching
          ? (
            <div>
              <h4 className="small-black-title search-result-title">Messages</h4>
              {messageThreadsSearchResults.map((searchResult) => {
                const friendRecipient = getFriendRecipient(currentUser, users, searchResult);

                console.log('>>> friendRecipient: ', friendRecipient);

                return (
                  <FriendDisplay
                    key={searchResult.id}
                    avatarId={friendRecipient.avatar_id}
                    name={friendRecipient.name}
                    id={searchResult.sending_user_id}
                    isMessageSearchResult
                    activeFriendId={activeFriendId}
                    setActiveFriendId={setActiveFriendId}
                    messageThreads={messageThreads}
                    setActiveMessagesThread={setActiveMessagesThread}
                    messageMatchingSearchInput={searchResult.text} />
                );
              })}
            </div>
          )
          : null
        }
      </StyledFriendsContainer>

    </StyledSidebarContainer>
  );
};

const StyledSidebarContainer = styled.div`
  width: 400px; 
  background-color: #f8f7f7;
  border-right: 1px solid #e9e9e9;

  .current-user-name {
    font-weight: bold;
    color: #9dbbf8;
  }
`;

const StyledHomePageHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 16vh;
`;

const StyledCurrentUserContainer = styled.div`
display: flex;
align-items: center;
padding: 20px 0px 15px 15px;

img {
  margin-right: 10px;
}

.current-user-avatar {
    height: 40px;
  }
`;

const StyledFriendsContainer = styled.div`
  overflow-y: scroll;
  height: 84vh;

  .search-result-title {
    margin: 30px 0 20px 15px;
  }

  .no-search-result {
    margin: 10px 0 20px 15px;
  }
`;

export default Sidebar;
