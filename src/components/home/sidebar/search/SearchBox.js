import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useRef } from 'react';

const SearchBox = ({
  searchInput,
  placeholder,
  autoFocus = false,
  onClickCloseSearch,
  onChange,
}) => {
  const ref = useRef(null);

  const onClickFocusOnSearchBox = () => {
    ref.current.focus();
  };

  return (
    <StyledSearchBoxContainer onClick={onClickFocusOnSearchBox}>
      <FontAwesomeIcon icon={faMagnifyingGlass} className="light-icon magnifying-glass" />
      <input
        ref={ref}
        type="text"
        placeholder={placeholder}
        autoFocus={autoFocus}
        value={searchInput}
        onChange={onChange} />
      {searchInput !== ''
        ? <FontAwesomeIcon icon={faXmark} className="light-icon x-icon" onClick={onClickCloseSearch} />
        : null
      }
    </StyledSearchBoxContainer>
  );
};

const StyledSearchBoxContainer = styled.div`
  cursor: pointer;
  width: 93%;
  background-color: #e7e6e6;
  border-radius: 7px;
  margin: 10px 0 5px 15px;
  display: flex;
  align-items: center;

  @media screen and (min-width: 1024px) {
      width: 372px;
  }

  input {
    background-color: transparent;
    color: #919190;
    border: none;
    width: 100%;
    margin: 5px 0;
    font-size: 14px;
  }

  input:focus {
    outline: none
  }

  .magnifying-glass {
    width: 12px;
    height: 12px;
    margin: 0px 10px;
  }
`;

export default SearchBox;
