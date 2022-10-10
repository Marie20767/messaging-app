/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';
import { allAvatars } from '../../../constants/constants';
import { getFormattedLastFriendMessage, getFormattedMessageSearchResult } from '../../../utils/utils';

const FriendDisplay = ({
  name,
  avatarId,
  isMessageSearchResult,
  searchInput,
  messageMatchingSearchInput,
  highlighted,
  lastFriendMessage,
  onClick,
}) => {
  const friendAvatar = allAvatars.find((avatar) => avatar.id === avatarId);

  // TODO: finish this, put into utils

  const renderHighlightedSearchResult = () => {
    if (!messageMatchingSearchInput) {
      return null;
    }

    const formattedMessage = getFormattedMessageSearchResult(messageMatchingSearchInput, searchInput);

    if (formattedMessage && searchInput) {
      const regex = new RegExp(searchInput, 'gi');
      const messageSplitBySearchInput = formattedMessage.split(regex);

      // const matchedMessageResults = formattedMessage.matchAll(regex);
      // const matchedMessages = [...matchedMessageResults];

      // console.log('>>> matchedMessages: ', matchedMessages);

      // const matchedIndexes = matchedMessages.map((result) => {
      //   return result.index;
      // });

      // const highlightedStrings = [];
      // let startingIndex = 0;

      // matchedIndexes.forEach(matchingIndex => {
      //   // push into highlightedStrings a substring from 0 to matchingIndex
      //   // push into highlightedStrings <b>{substring from matchingIndex up until end of search term}</b>
      //   // update startingIndex to matchingIndex
      // })

      const highlightedSearchResult = messageSplitBySearchInput.map((string, index) => {
        if (index === messageSplitBySearchInput.length - 1) {
          return <span key={`${string}-${index}`}>{string}</span>;
        }

        return (
          <React.Fragment key={`${string}-${index}`}>
            <span>{string}</span>
            <span className="search-input-match">{searchInput}</span>
          </React.Fragment>
        );
      });

      return highlightedSearchResult;
    }

    return null;
  };

  const formattedLastMessage = lastFriendMessage ? getFormattedLastFriendMessage(lastFriendMessage) : '';

  return (
    <StyledFriendContainer onClick={onClick} className={highlighted ? 'active-friend' : 'non-active-friend'}>
      <img src={friendAvatar.animal} alt="Friend avatar" />
      <StyledNameAndMessageContainer>
        <h4 className="small-black-title">{name}</h4>
        {isMessageSearchResult
          ? <p>{renderHighlightedSearchResult()}</p>
          : <p className="last-message">{formattedLastMessage}</p>
        }
      </StyledNameAndMessageContainer>
    </StyledFriendContainer>
  );
};

const StyledFriendContainer = styled.div`
  display: flex;
  align-items: center;
  height: 90px;
  padding: 15px 0 15px 10px;
  margin: 0 5px 0 15px;
  cursor: pointer;

  &.active-friend {
    background-color: #9dbbf8a9;
    border-radius: 10px;
  }

  &.non-active-friend {
    background-color: transparent;

    &:hover {
      background-color: #e7e6e6;
      border-radius: 10px;
    }
  }

  img {
    height: 50px;
    margin-right: 10px;
  }
`;

const StyledNameAndMessageContainer = styled.div`
  p {
    font-size: 14px;
  }

  .search-input-match {
    font-weight: bold;
    color: #9dbbf8;
  }
  
  .last-message {
    margin-top: 2px;
    padding-right: 25px;
  }
`;

export default FriendDisplay;

