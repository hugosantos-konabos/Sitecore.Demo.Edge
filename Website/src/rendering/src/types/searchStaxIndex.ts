import { Field } from '@sitecore-jss/sitecore-jss-nextjs';

export type SearchStaxIndex = {
  name: Field<string>;
  fields: {
    OverrideIndexCoreName: Field<string>;
    SearchModel: Field<string>;
    SearchEndpoint: Field<string>;
    ApiKey: Field<string>;
    FieldsMapping: Field<string>;
    SuggesterEndpoint: Field<string>;
    SearchApiKey: Field<string>;
    AnalyticsApiKey: Field<string>;
    SolrUsername: Field<string>;
    SolrPassword: Field<string>;
  };
};
