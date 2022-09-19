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

      {/* <div className="input-container">
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
      </div> */}

      <div className="app">
        <div className="search-input-wrapper">
          <div className="feedback-wrapper">
            <div id="sf-feedback"></div>
          </div>
          <div id="searchInput"></div>
        </div>
        <div className="search-results-summary-options-wrapper">
          <div id="searchResultSummarySection"></div>
          <div id="searchOptionsSection"></div>
        </div>
        <div className="search-results-wrapper">
          <div className="facet-container-wrapper">
            <div id="searchFacetSection"></div>
          </div>
          <div className="result-container-wrapper">
            <div id="searchResultsSection"></div>
            <div id="relatedSearchesSection"></div>
            <div id="paginationSection"></div>
          </div>
        </div>
      </div>

      <Script id="searchStaxCookies">{`
         function getCookie(name) {
          let matches = document.cookie.match(new RegExp('(?:^|; )' +
              name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
          return matches ? decodeURIComponent(matches[1]) : undefined;
      }

      function setCookie(name, value, options = {}) {
          options = {
              path: '/',
              // add other defaults here if necessary
              ...options,
          };
          if (options.expires instanceof Date) {
              options.expires = options.expires.toUTCString();
          }
          let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
          for (let optionKey in options) {
              updatedCookie += '; ' + optionKey;
              let optionValue = options[optionKey];
              if (optionValue !== true) {
                  updatedCookie += '=' + optionValue;
              }
          }
          document.cookie = updatedCookie;
      }

      function makeid(length) {
          var result = '';
          var characters =
              'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          var charactersLength = characters.length;
          for (var i = 0; i < length; i++) {
              result += characters.charAt(Math.floor(Math.random() * charactersLength));
          }
          return result;
      }

      function getOrSetCookie(name) {
          let cookieID = getCookie(name);
          if (cookieID == null) {
              cookieID = makeid(25);
              setCookie(name, cookieID, {
                  secure: true,
                  'max-age': 3600,
              });
          }
          return cookieID;
      }`}</Script>

      <Script id="searchStaxCookies">{`
        <div class="card-searchstudio-js-custom"
          :class="{'card-searchstudio-js-grid-layout': isGridLayout, 'has-thumbnail': thumbnail
          !== ''}">
          <div class="card-searchstudio-jsClass">
            <div class="card-searchstudio-js-body p-0">
              <span class="badge" v-if="ribbon" v-html="ribbon" />
              <div class="card-searchstudio-js-title" v-if="title">
                <a class="stretched-link" v-if="url" :href="url" @@click="navigate"
                    v-html="title" />
                <span v-else v-html="title" />
              </div>
              <span class="card-searchstudio-js-path" v-if="paths" v-html="paths" />
              <span class="star elevated" v-if="promoted">&nbsp;</span>
              <div class="thumbnail" v-if="thumbnail"><span><img
                :src="thumbnail"></span></div>
              <div class="card-searchstudio-js-body p-0" :key="propertyName"
                v-for="(value, propertyName) in result">
                <div v-if="displayProperty(value, propertyName)">
                    <div class="card-searchstudio-js-text" :class="propertyName">
                      <span class="image" v-if="isImage(value)"><img :src="value" /> </span>
                      <span class=valueClass(value) v-html="extractedValue(propertyName, value)"
                          v-else />
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>`}</Script>

      <Script id="searchStaxCookies">{`
        <div
        class="related-searches-container">
          <div v-if="storeState.relatedSearches.length">

            <b>Related searches:</b>
            <span v-for="(value, index) in storeState.relatedSearches"
                  :key="index"
                  class="related-search">
              <a @@click="search(value, $event)"
                      class="related-search-item"
                href="#">
                {{ value }}<span v-if="index < storeState.relatedSearches.length - 1 ">,</span>
              </a>
            </span>
          </div>
        </div>`}</Script>
    </div>
  );
};

export default SearchPage;
