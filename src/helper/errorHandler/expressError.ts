import HttpStatus from 'http-status-codes';
import constant from '../../constant';
import { ErrorItem } from '../apiResponse/apiErrorResponseBody';

export class ExpressError extends Error {
  statusText: string = constant.EXPRESS_ERRORS.INTERNAL_SERVER_ERROR;
  errors: Array<ErrorItem> = new Array<ErrorItem>();
  status: number = HttpStatus.INTERNAL_SERVER_ERROR;

  constructor(status?: number, statusText?: string, errors?: Array<ErrorItem>) {
    super(statusText);

    if (status) {
      this.status = status;
    }
    if (statusText) {
      this.statusText = statusText;
    }

    if (errors) {
      this.errors = errors;
    }
  }
}
