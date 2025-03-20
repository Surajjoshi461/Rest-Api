export type ErrorItem = {
  field?: Array<string | number>;
  messages?: Array<string>;
  types?: Array<string>;
};

export type ErrorResponseBody = {
  errors: Array<ErrorItem>;
};
