import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import Script from 'next/script';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { SitecoreContextValue, ComponentProps } from 'lib/component-props';
import { SearchStaxIndex } from 'src/types/searchStaxIndex';

type SearchStaxSearchPageProps = ComponentProps & {
  fields: {
    SearchModelDefinition: Field<string>;
    OverrideIndexCoreName: Field<string>;
    SearchModel: Field<string>;
    SearchEndpointUrl: Field<string>;
    ApiKey: Field<string>;
    FieldsMapping: Field<string>;
    SuggesterEndpointUrl: Field<string>;
    SearchApiKey: Field<string>;
    AnalyticsApiKey: Field<string>;
    SolrUsername: Field<string>;
    SolrPassword: Field<string>;
    SearchStaxIndex: SearchStaxIndex;
  };
};

const SearchPage = (props: SearchStaxSearchPageProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext<SitecoreContextValue>();
  // const searchEndpointUrl =
  //   'https://ss984481-oi64ob1t-us-east-1-aws.searchstax.com/solr/sitecore1022-820/emselect';
  // const authenticationToken = 'YXBwODIwLWFwaTpLb25hYm9zITIz';
  // const apiKey = 'lqvvpTEyr3hyr20QxXlGASK8y1to57CpPcbrlpdZ2TI';
  // const fieldsMapping =
  //   '{"title":"resulttitle_t","url":"resulturl_s","description":"renderedcontent_t","ribbon":"_templatename","paths":"_fullpath"}';
  // const suggesterEndpointUrl =
  //   'https://ss984481-oi64ob1t-us-east-1-aws.searchstax.com/solr/sitecore1022-820-suggester/emsuggest';
  // const searchApiKey = '64d9d3225a7f03d96cf01418fe49e3269b8cbb89';
  // const analyticsApiKey = 'lqvvpTEyr3hyr20QxXlGASK8y1to57CpPcbrlpdZ2TI';

  const basicToken = new Buffer(
    props.fields.SolrUsername.value + ':' + props.fields.SolrPassword.value
  ).toString('base64');

  let language = sitecoreContext.language;
  if (language?.length > 2) {
    language = language.substring(0, 2);
  }

  let additionalArgs =
    'hl.fragsize=200&fq=_language:"' + sitecoreContext.language + '"&fq=_haslayout_b:true';

  if (props.fields.SearchModel.value !== undefined && props.fields.SearchModel.value != '') {
    additionalArgs += '&model=' + props.fields.SearchModel.value;
  }

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

      <div className="app">
        <div id="test">${props.fields.SearchStaxIndex.fields.SearchEndpointUrl.value}</div>
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

      <Script type="text/x-template" id="result-template">{`
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

      <Script type="text/x-template" id="customRelatedSearches-template">{`
        <div class="related-searches-container">
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

      <Script id="studioConfig">{`
        const session = getOrSetCookie('searchcookie');

        function format_date(value) {
          if (value != null) {
                  if (typeof value == 'undefined') {
              return '';
            }
            date_value = Date.parse(value);
            const options = {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            };
            return new Date(value).toLocaleDateString(undefined, options);
          }
          return value;
        }
        const studioConfig = {
          "connector": {
            "url": "${props.fields.SearchEndpointUrl.value}",
            "authentication": "${basicToken}",
            "apikey": "${props.fields.ApiKey.value}",
            "session": session,
            "fields": ${props.fields.FieldsMapping.value},
            "suggester": "${props.fields.SuggesterEndpointUrl.value}",
            "relatedSearches": "",
            "searchAPIKey":  "${props.fields.SearchApiKey.value}",
            "fieldFormatters": {
              date: format_date,
            },
            hideUniqueKey: true,
            searchAdditionalArgs: '${additionalArgs}',
            language: '${language}',
            defaultQuery: "*"
          },
          searchResults: '#searchResultsSection',
          searchInput: '#searchInput',
          searchResultSummarySection: '#searchResultSummarySection',
          facetSection: '#searchFacetSection',
          searchOptionsSection: '#searchOptionsSection',
          relatedSearchesSection: '#relatedSearchesSection',
          hideBranding: false,
          display: 'multi',
          facet_pagination: 4,
          customResultTemplate: '#result-template',
          customRelatedSearchesTemplate: '#customRelatedSearches-template',
          paginationSection: '#paginationSection',
        };`}</Script>

      <Script id="searchstaxWidget">{`
        (function (w, d, s, o, f) {
          w['sf-widget'] = o;
          w[o] =
              w[o] ||
              function () {
                  (w[o].q = w[o].q || []).push(arguments);
              };
          js = d.createElement(s);
          fjs = d.getElementsByTagName(s)[0];
          js.src = f;
          js.async = 1;
          fjs.parentNode.insertBefore(js, fjs);
      })(window, document, 'script', '_sf', 'https://static.searchstax.com/studio-js/v3/js/studio-feedback.js');
      _sf('${props.fields.AnalyticsApiKey.value}');`}</Script>
    </div>
  );
};

export default SearchPage;
