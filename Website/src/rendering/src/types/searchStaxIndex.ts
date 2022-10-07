import { Field } from '@sitecore-jss/sitecore-jss-nextjs';

export type SearchStaxIndex = {
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
  };
};
