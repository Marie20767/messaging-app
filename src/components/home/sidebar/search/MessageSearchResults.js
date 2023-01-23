import { useDispatch, useSelector } from 'react-redux';

import { getFriendMessageSearchResult, onUpdateReadMessages } from '../../../../utils/utils';
import { setActiveFriendId, setMessageThreads } from '../../../../redux/user';

import FriendDisplay from '../FriendDisplay';

const MessageSearchResults = ({
  messageExists,
  messageThreadsSearchResults,
  friends,
  searchInput,
  activeSearchResultIds,
  setActiveSearchResultIds,
  updateIsActiveMessageThreadShowing,
}) => {
  const { currentUser, messageThreads } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const onClickSelectMessageResult = (messageId) => {
    setActiveSearchResultIds({ messageId });
    updateIsActiveMessageThreadShowing(true);

    const activeMessagesThread = messageThreads.find((thread) => {
      const threadHasMessage = thread.messages.some((message) => message.id === messageId);

      return threadHasMessage;
    });

    dispatch(setActiveFriendId(activeMessagesThread.friendParticipantId));

    onUpdateReadMessages(activeMessagesThread.friendParticipantId, messageThreads, setMessageThreads);
  };

  if (!messageExists) {
    return null;
  }

  return (
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
  );
};

export default MessageSearchResults;
