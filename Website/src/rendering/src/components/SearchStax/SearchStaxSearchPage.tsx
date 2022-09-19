import Script from 'next/script';

const SearchPage = (): JSX.Element => {
  return (
    <div>
      <Script src="https://static.searchstax.com/studio-js/v3/js/studio-app.js"></Script>
      <Script src="https://static.searchstax.com/studio-js/v3/js/studio-vendors.js"></Script>
      <Script src="https://static.searchstax.com/studio-js/v3/js/search-widget.min.js"></Script>

      <Script id="searchStaxAnalytics">{`
        var _msq = _msq || []; //declare object
        var analyticsBaseUrl = "https://analytics-us.searchstax.com";
        (function () {
          var ms = document.createElement("script");
          ms.type = "text/javascript";
          ms.src = "https://static.searchstax.com/studio-js/v3/js/studio-analytics.js";
          var s = document.getElementsByTagName("script")[0];
          s.parentNode.insertBefore(ms, s);
        })();`}</Script>

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
                  <div
                    role="combobox"
                    aria-expanded="false"
                    aria-haspopup="listbox"
                    aria-owns="autosuggest-autosuggest__results"
                  >
                    <input
                      type="text"
                      autoComplete="off"
                      aria-autocomplete="list"
                      aria-activedescendant=""
                      aria-controls="autosuggest-autosuggest__results"
                      id="searchTerm"
                      placeholder="Search For..."
                      // autoFocus="autofocus"
                      className=""
                    ></input>
                  </div>
                  <div
                    id="autosuggest-autosuggest__results"
                    className="autosuggest__results-container"
                  ></div>
                </div>
                <span>
                  <button type="submit" className="btn text-primary search-close-button">
                    <span className="search-icon"></span>
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
