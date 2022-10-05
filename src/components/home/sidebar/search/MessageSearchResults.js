import { useState } from 'react';
import { getFriendMessageSearchResult } from '../../../../utils/utils';
import FriendDisplay from '../FriendDisplay';
/* eslint-disable react/jsx-no-useless-fragment */

const MessageSearchResults = ({
  messageExists,
  messageThreadsSearchResults,
  currentUser,
  users,
  searchInput,
  messageThreads,
  setActiveMessagesThread,
  setActiveFriendId,
}) => {
  const [selectedMessageId, setSelectedMessageId] = useState(null);

  const onClickSelectMessageResult = (messageId) => {
    setSelectedMessageId(messageId);

    const activeMessageThread = messageThreads.find((thread) => {
      const threadHasMessage = thread.messages.some((message) => message.id === messageId);

      return threadHasMessage;
    });

    setActiveMessagesThread(activeMessageThread);
    setActiveFriendId(activeMessageThread.friendParticipantId);
  };

  return (
    <>
      {messageExists
        ? (
          <div>
            <h4 className="small-black-title search-result-title">Messages</h4>
            {messageThreadsSearchResults.map((searchResult) => {
              const friendMessageSearchResult = getFriendMessageSearchResult(currentUser, users, searchResult);
              const highlighted = selectedMessageId === searchResult.id;

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
