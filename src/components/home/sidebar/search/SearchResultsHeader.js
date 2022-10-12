const SearchResultsHeader = ({
  friendUserNameExists,
  title,
  searchInput,
  noSearchResultText,
  hasSearchResults,
}) => {
  return (
    <>
      {searchInput !== '' && friendUserNameExists
        ? <h4 className="small-black-title search-result-title">{title}</h4>
        : null
      }

      {searchInput !== '' && !hasSearchResults
        ? <p className="no-search-result">{noSearchResultText}</p>
        : null
      }
    </>
  );
};

export default SearchResultsHeader;

