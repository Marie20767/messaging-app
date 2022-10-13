/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';
import { allAvatars } from '../../../constants/constants';
import { getFormattedLastFriendMessage, renderHighlightedSearchResult } from '../../../utils/utils';

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

  const getHighlightedSearchResult = () => {
    const messageSplitBySearchMatch = renderHighlightedSearchResult(messageMatchingSearchInput, searchInput);

    const highlightedMessage = messageSplitBySearchMatch.map((substring) => {
      if (substring.toLowerCase() === searchInput.toLowerCase()) {
        return <strong className="search-input-match">{substring}</strong>;
      }

      return substring;
    });

    return highlightedMessage;
  };

  renderHighlightedSearchResult(messageMatchingSearchInput, searchInput);

  const formattedLastMessage = lastFriendMessage ? getFormattedLastFriendMessage(lastFriendMessage) : '';

  return (
    <StyledFriendContainer onClick={onClick} className={highlighted ? 'active-friend' : 'non-active-friend'}>
      <img src={friendAvatar.animal} alt="Friend avatar" />
      <StyledNameAndMessageContainer>
        <h4 className="small-black-title">{name}</h4>
        {isMessageSearchResult
          ? <p>{getHighlightedSearchResult()}</p>
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
  padding: 15px 10px 20px 10px;
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

