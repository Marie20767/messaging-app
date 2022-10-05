const SearchResultsHeader = ({ friendUserNameExists, friendSearchResult, messageExists, searchInput }) => {
  return (
    <>
      {friendUserNameExists
        ? <h4 className="small-black-title search-result-title">Contacts</h4>
        : null
      }

      {friendSearchResult.length === 0 && !messageExists
        ? <p className="no-search-result">{`No result for '${searchInput}'`}</p>
        : null
    }
    </>

  );
};

export default SearchResultsHeader;
