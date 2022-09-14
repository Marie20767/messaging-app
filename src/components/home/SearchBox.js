import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useRef } from 'react';

const SearchBox = ({
  searchInput,
  setSearchInput,
  setSearchResult,
  setIsSearching,
  onChangeSearchInputGetSearchResults,
}) => {
  const ref = useRef(null);

  const onClickFocusOnSearchBox = () => {
    ref.current.focus();
  };

  const onClickCloseSearch = () => {
    setSearchInput('');
    setSearchResult([]);
    setIsSearching(false);
  };

  return (
    <StyledSearchBoxContainer onClick={onClickFocusOnSearchBox}>
      <FontAwesomeIcon icon={faMagnifyingGlass} className="icon magnifying-glass" />
      <input
        ref={ref}
        type="text"
        placeholder="Search"
        value={searchInput}
        onChange={(e) => onChangeSearchInputGetSearchResults(e)} />
      {searchInput !== ''
        ? <FontAwesomeIcon icon={faXmark} className="icon x-mark" onClick={onClickCloseSearch} />
        : null
      }
    </StyledSearchBoxContainer>
  );
};

const StyledSearchBoxContainer = styled.div`
  cursor: pointer;
  background-color: #e9e9e9;
  width: 13%;
  border-radius: 7px;
  margin: 10px 0 5px 15px;

  input {
    background-color: transparent;
    border: none;
    width: 70%;
    margin: 5px 0;
    font-size: 14px;
  }

  input:focus {
    outline: none
  }

  .icon {
    color: #919190;
  }

  .magnifying-glass {
    margin: 2px 8px;
    width: 12px;
    height: 12px;
  }
`;

export default SearchBox;
