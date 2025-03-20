import { ErrorItem } from "../apiResponse/apiErrorResponseBody";
import { ExpressError } from "./expressError";

export type CustomErrorResponse = {
  status: number;
  message: string;
  body: {
    error: string | Array<ErrorItem> | ExpressError;
  };
};
