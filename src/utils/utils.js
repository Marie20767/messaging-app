const getFormattedMessageThreads = (messageThreadsResults, currentUserId) => {
  const threadsToMessagesMap = messageThreadsResults.reduce((acc, currentMessage) => {
    return {
      ...acc,
      [currentMessage.thread_id]: [
        ...acc[currentMessage.thread_id] || [],
        {
          id: currentMessage.id,
          thread_id: currentMessage.thread_id,
          sending_user_id: currentMessage.sending_user_id,
          recipient_user_id: currentMessage.recipient_user_id,
          text: currentMessage.text,
          timestamp: currentMessage.timestamp,
        },
      ],
    };
  }, {});

  const arraysOfMessagesPerThread = Object.values(threadsToMessagesMap);

  const finalMessageThread = arraysOfMessagesPerThread.map((messageThread) => {
    const messageSentByParticipant = messageThread.find((message) => message.sending_user_id !== currentUserId);

    return {
      friendParticipantId: messageSentByParticipant.sending_user_id,
      messages: messageThread,
    };
  });

  return finalMessageThread;
};

const getFriendMessageSearchResult = (currentUser, friends, searchResult) => {
  const {
    sending_user_id,
    recipient_user_id,
  } = searchResult;

  const friend_id = currentUser.id === recipient_user_id ? sending_user_id : recipient_user_id;

  return friends.find((user) => {
    return user.id === friend_id;
  });
};

const getFormattedLastFriendMessage = (string) => {
  const splitString = string.split(' ');

  return splitString.length > 13 ? `${splitString.slice(0, 13).join(' ')}...` : splitString.join(' ');
};

const getFormattedMessageSearchResult = (string, searchInput) => {
  const splitString = string.split(' ');
  const lastIndex = splitString.length - 1;

  const indexOfSearchResult = splitString.findIndex((element) => element.toLowerCase().includes(searchInput.toLowerCase()));

  const suffix = (indexOfSearchResult === lastIndex) || lastIndex < 13 ? '' : '...';

  return indexOfSearchResult < 13 ? `${splitString.slice(0, 13).join(' ')}${suffix}` : `${suffix}${splitString.slice(indexOfSearchResult - 12, indexOfSearchResult + 5).join(' ')}${suffix}`;
};

export { getFormattedMessageThreads, getFriendMessageSearchResult, getFormattedLastFriendMessage, getFormattedMessageSearchResult };
