const SearchResultsHeader = ({ friendUserNameExists, title, searchInput, friendSearchResult, variableExists, noSearchResultText }) => {
  console.log('>>> friendSearchResult.length: ', friendSearchResult.length);
  console.log('>>> friendUserNameExists: ', friendUserNameExists);
  console.log('>>> variableExists: ', variableExists);

  return (
    <>
      {searchInput !== '' && friendUserNameExists
        ? <h4 className="small-black-title search-result-title">{title}</h4>
        : null
      }

      {friendSearchResult.length === 0 && !variableExists && searchInput !== ''
        ? <p className="no-search-result">{noSearchResultText}</p>
        : null
      }
    </>

  );
};


export default SearchResultsHeader;

