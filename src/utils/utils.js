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
          text: currentMessage.text,
          timestamp: currentMessage.timestamp,
        },
      ],
    };
  }, {});

  const arraysOfMessagesPerThread = Object.values(threadsToMessagesMap);

  const finalMessageThread = arraysOfMessagesPerThread.map((messageThread) => {
    return {
      demoUserParticipantId: messageThread.find((message) => message.sending_user_id !== parseInt(currentUserId)).sending_user_id,
      messages: messageThread,
    };
  });

  return finalMessageThread;
};

export { getFormattedMessageThreads };
