import React from 'eslint-plugin-import/config/react';
import moment from 'moment';
import styled from 'styled-components';
import NewFriendWelcomeMessage from '../../../images/new-friend-welcome-message.png';
import Message from './Message';

const Messages = ({ activeMessagesThread, currentUserId, messagesEndRef }) => {
  if (!activeMessagesThread) {
    return (
      <StyledEmptyMessagesThreadContainer>
        <h3>No messages here yet...</h3>
        <h3>Don&apos;t be shy, send a message!</h3>
        <img src={NewFriendWelcomeMessage} alt="Waving bear" />
      </StyledEmptyMessagesThreadContainer>
    );
  }

  console.log('>>> activeMessagesThread: ', activeMessagesThread);

  const messagesGroupedByDateSent = activeMessagesThread.messages.reduce((acc, message) => {
    // console.log('>>> message: ', message);
    const messageDate = moment(message.timestamp).format('ddd ll');

    console.log('>>> acc: ', acc);

    if (acc[messageDate]) {
      return {
        ...acc,
        [messageDate]: [
          ...acc[messageDate],
          message,
        ],
      };
    }

    return {
      ...acc,
      [messageDate]: [
        message,
      ],
    };
  }, {});

  console.log('>>> messagesGroupedByDateSent: ', messagesGroupedByDateSent);

  // [
  //   { text: '2 days ago' }
  //   { text: 'hbygb' },
  //   { text: 'first of yest' }
  //   { text: 'hbygb' },
  //   { text: 'firsy og today' },
  //   { text: 'hbygb' },
  // ]

  // {
  //   messageSentDate: [
  //     {
  //       message
  //     },
  //     {
  //       message
  //     },
  //     {message
  //     },
  //   ]
  //   messageSentDate [
  //     {
  //       message
  //     }
  //   ]
  // }

  // [
  //     [{ text: 'meesg frm 2 days ago' }, { text: 'hbygb' }]
  //     [{ text: 'yest' }, { text: 'hbygb' }]
  //
  //     Today
  //     [{ text: 'today', timestamp: '2022-10-14T13:14:16.797Z' }, { text: 'hbygb' }, { text: 'hbygbjb' }]
  // ]

  // [
  //   {

  //   }
  // ]

  // If the message is the same date as today's date we need TODAY
  // If it's one day less we need YESTERDAY
  // Otherwise we need WEEKDAY and DATE e.g. WED 14 Oct

  // const messageDate = moment(formattedDateAndTime).format('ddd ll');
  // const isToday = moment().isSame(messageDate, 'day');
  // const isYesterday = moment(formattedDateAndTime).isSame((moment().subtract(1, 'days')), 'day');

  return (
    <StyledMessagesContainer>
      {activeMessagesThread.messages.map((message) => {
        console.log('>>> message: ', message);

        return (
          <Message
            key={message.id}
            message={message}
            currentUserId={currentUserId}
            messagesEndRef={messagesEndRef} />
        );
      })}
    </StyledMessagesContainer>
  );
};

const StyledEmptyMessagesThreadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    padding-bottom: 10px;
  }

  img {
    height: 70px;
    margin-top: 5px;
  }
`;

const StyledMessagesContainer = styled.div`
  overflow-y: scroll;
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 0px 25px 0px 15px;
`;

export default Messages;
