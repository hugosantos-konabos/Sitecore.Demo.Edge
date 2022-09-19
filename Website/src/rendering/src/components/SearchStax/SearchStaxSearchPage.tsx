const SearchPage = (): JSX.Element => {
  return (
    <Script src="https://static.searchstax.com/studio-js/v3/js/studio-app.js"></Script>
    <div>
      <div>
        <div>SearchStax for Sitecore</div>
        <div>Symposium Demo!</div>
      </div>

      <div class="input-container">
        <div class="sf-header-searchstudio-js mb-5">
          <div>
              <div class="sf-form">
                <div class="form-group">
                    <div id="autosuggest" class="form-control-suggest">
                      <div role="combobox" aria-expanded="false" aria-haspopup="listbox" aria-owns="autosuggest-autosuggest__results"><input type="text" autocomplete="off" aria-autocomplete="list" aria-activedescendant="" aria-controls="autosuggest-autosuggest__results" id="searchTerm" placeholder="Search For..." autofocus="autofocus" class=""></div>
                      <div id="autosuggest-autosuggest__results" class="autosuggest__results-container">
                          <!----> 
                      </div>
                    </div>
                    <!----><span><button type="submit" class="btn text-primary search-close-button"><span class="search-icon"></span></button></span><!---->
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
