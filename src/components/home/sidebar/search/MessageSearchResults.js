import { getFriendMessageSearchResult, onUpdateReadMessages } from '../../../../utils/utils';
import FriendDisplay from '../FriendDisplay';
/* eslint-disable react/jsx-no-useless-fragment */

const MessageSearchResults = ({
  messageExists,
  messageThreadsSearchResults,
  friendIdsUnreadMessages,
  setFriendIdsUnreadMessages,
  currentUser,
  friends,
  searchInput,
  messageThreads,
  setActiveFriendId,
  activeSearchResultIds,
  setActiveSearchResultIds,
}) => {
  const onClickSelectMessageResult = (messageId) => {
    setActiveSearchResultIds({ messageId });

    const activeMessagesThread = messageThreads.find((thread) => {
      const threadHasMessage = thread.messages.some((message) => message.id === messageId);

      return threadHasMessage;
    });

    setActiveFriendId(activeMessagesThread.friendParticipantId);

    onUpdateReadMessages(friendIdsUnreadMessages, activeMessagesThread.friendParticipantId, setFriendIdsUnreadMessages, messageThreads);
  };

  return (
    <>
      {messageExists
        ? (
          <div>
            <h4 className="small-black-title search-result-title">Messages</h4>
            {messageThreadsSearchResults.map((searchResult) => {
              const friendMessageSearchResult = getFriendMessageSearchResult(currentUser, friends, searchResult);
              const highlighted = activeSearchResultIds?.messageId === searchResult.id;

              return (
                <FriendDisplay
                  key={searchResult.id}
                  avatarId={friendMessageSearchResult.avatar_id}
                  name={friendMessageSearchResult.name}
                  highlighted={highlighted}
                  id={currentUser.id === searchResult.recipient_user_id ? searchResult.sending_user_id : searchResult.recipient_user_id}
                  isMessageSearchResult
                  searchInput={searchInput}
                  messageMatchingSearchInput={searchResult.text}
                  onClick={() => onClickSelectMessageResult(searchResult.id)} />
              );
            })}
          </div>
        )
        : null
        }
    </>
  );
};

export default MessageSearchResults;
