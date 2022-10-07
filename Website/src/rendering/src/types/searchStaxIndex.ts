import { Field } from '@sitecore-jss/sitecore-jss-nextjs';

export type SearchStaxIndex = {
  name: Field<string>;
  fields: {
    RootItem: Field<string>;
    SearchEndpoint: Field<string>;
    SuggestEndpoint: Field<string>;
    ReleatedSearchEndpoint: Field<string>;
    SearchApiKey: Field<string>;
    AuthenticationBasicToken: Field<string>;
    AdminAuthenticationBasicToken: Field<string>;
    SolrUsername: Field<string>;
    SolrPassword: Field<string>;
    AdminSolrUsername: Field<string>;
    AdminSolrPassword: Field<string>;
    HostedSearchPagePassword: Field<string>;
    AnalyticsEndpoint: Field<string>;
    AnalyticsApiKey: Field<string>;
    IndexCoreName: Field<string>;
    SearchAppName: Field<string>;
    SearchAppId: Field<string>;
    Account: Field<string>;
    FieldsMapping: Field<string>;
  };
};
