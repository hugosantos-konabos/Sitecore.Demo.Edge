import Script from 'next/script';

const SearchPage = (): JSX.Element => {
  return (
    <div>
      <Script src="https://static.searchstax.com/studio-js/v3/js/studio-app.js"></Script>
      <Script src="https://static.searchstax.com/studio-js/v3/js/studio-vendors.js"></Script>

      <div>
        <div>SearchStax for Sitecore</div>
        <div>Symposium Demo!</div>
      </div>

      <div className="input-container">
        <div className="sf-header-searchstudio-js mb-5">
          <div>
            <div className="sf-form">
              <div className="form-group">
                <div id="autosuggest" className="form-control-suggest">
                  <div role="combobox" aria-expanded="false" aria-haspopup="listbox" aria-owns="autosuggest-autosuggest__results"><input type="text" autocomplete="off" aria-autocomplete="list" aria-activedescendant="" aria-controls="autosuggest-autosuggest__results" id="searchTerm" placeholder="Search For..." autofocus="autofocus" className=""></input></div>
                  <div id="autosuggest-autosuggest__results" className="autosuggest__results-container"></div>
                </div>
                <span><button type="submit" className="btn text-primary search-close-button"><span className="search-icon"></span></button></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
