const SearchResultsHeader = ({
  friendUserNameExists,
  title,
  noSearchResultText,
  hasSearchResults,
}) => {
  return (
    <>
      {friendUserNameExists
        ? <h4 className="small-black-title search-result-title">{title}</h4>
        : null
      }

      {!hasSearchResults
        ? <p className="no-search-result">{noSearchResultText}</p>
        : null
      }
    </>
  );
};

export default SearchResultsHeader;

