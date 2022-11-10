/* eslint-disable react/no-array-index-key */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import styled from 'styled-components';
import { allAvatars } from '../../../constants/constants';
import { getFormattedLastFriendMessage, renderHighlightedSearchResult } from '../../../utils/utils';

const FriendDisplay = ({
  name,
  avatarId,
  hasUnreadMessage,
  isMessageSearchResult,
  searchInput,
  messageMatchingSearchInput,
  highlighted,
  lastFriendMessageText,
  onClick,
}) => {
  const friendAvatar = allAvatars.find((avatar) => avatar.id === avatarId);

  const getHighlightedSearchResult = () => {
    const messageSplitBySearchMatch = renderHighlightedSearchResult(messageMatchingSearchInput, searchInput);

    const highlightedMessage = messageSplitBySearchMatch.map((substring, index) => {
      if (substring.toLowerCase() === searchInput.toLowerCase()) {
        return <strong key={`${substring}-${index}`} className="search-input-match">{substring}</strong>;
      }

      return substring;
    });

    return highlightedMessage;
  };

  renderHighlightedSearchResult(messageMatchingSearchInput, searchInput);

  const formattedLastMessage = lastFriendMessageText ? getFormattedLastFriendMessage(lastFriendMessageText) : '';

  if (!friendAvatar) {
    return null;
  }

  return (
    <StyledFriendContainer onClick={onClick} className={highlighted ? 'active-friend' : 'non-active-friend'}>
      <img src={friendAvatar.animal} alt="Friend avatar" />
      <StyledNameAndMessageContainer>
        <div>
          <h4 className="small-black-title">{name}</h4>
          {isMessageSearchResult
            ? <p>{getHighlightedSearchResult()}</p>
            : <p className="last-message">{formattedLastMessage}</p>
        }
        </div>
        <div className="unread-icon-container">
          {hasUnreadMessage
            ? <FontAwesomeIcon icon={faPaw} fontSize="14px" className="unread-icon" />
            : null
          }
        </div>

      </StyledNameAndMessageContainer>
    </StyledFriendContainer>
  );
};

const StyledFriendContainer = styled.div`
  display: flex;
  align-items: center;
  min-height: 70px;
  padding: 0px 10px;
  margin-left: 5px;
  cursor: pointer;

  img {
    height: 35px;
    margin-right: 10px;
  }

  @media screen and (min-width: 768px) {
    padding: 15px 10px 20px 10px;
    height: 80px;
    margin: 0 5px 0 15px;

    &.active-friend {
    background-color: #9dbbf8a9;
    border-radius: 10px;
    }

    &.non-active-friend {
    background-color: transparent;
    }

    img {
      height: 42px
    }
  }

  @media screen and (min-width: 1024px) {
    height: 90px;

    img {
      height: 50px
    }

    &.non-active-friend {
      &:hover {
        background-color: #e7e6e6;
       border-radius: 10px;
      }
    }
  }
`;

const StyledNameAndMessageContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  .unread-icon-container {
    display: flex;
    align-items: center;
    margin-right: 15px;
  }

  .unread-icon {
    color: #ea738dff;
  }

  .search-input-match {
    font-weight: bold;
    color: black;
  }
  
  .last-message {
    margin-top: 2px;
    padding-right: 25px;
  }

  @media screen and (min-width: 768px) {
    .last-message {
      padding-right: 0;
    }

    .unread-icon-container {
      margin-right: 0;
    }
  }

  @media screen and (min-width: 1024px) {
    .last-message {
      margin-top: 2px;
      padding-right: 5px;
    }

    .unread-icon-container {
      margin-right: 15px;
    }

    p {
      font-size: 14px;
    }
  }
`;

export default FriendDisplay;

