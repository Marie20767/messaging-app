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
    return {
      friendParticipantId: messageThread.find((message) => message.sending_user_id !== parseInt(currentUserId)).sending_user_id,
      messages: messageThread,
    };
  });

  return finalMessageThread;
};

const getFriendRecipient = (currentUser, users, searchResult) => {
  const {
    sending_user_id,
    recipient_user_id,
  } = searchResult;

  const friend_id = parseInt(currentUser.id) === recipient_user_id ? sending_user_id : recipient_user_id;

  return users.find((user) => {
    return parseInt(user.id) === friend_id;
  });
};

export { getFormattedMessageThreads, getFriendRecipient };
