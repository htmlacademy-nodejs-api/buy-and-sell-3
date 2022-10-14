import request from 'axios';
import {toast} from 'react-toastify';
import {ErrorType, ValidationErrorField} from '../types/error';
import {HTTP_CODE} from '../const';

export const errorHandle = (error: ErrorType): void => {
  if (!request.isAxiosError(error)) {
    throw error;
  }

  const {response} = error;

  if (response) {
    switch (response.status) {
      case HTTP_CODE.BAD_REQUEST:
        (response.data.details)
          ? response.data.details
            .forEach(
              (detail: ValidationErrorField) =>
                detail.messages
                  .forEach(
                    (message: string) => toast.info(message),
                  ),
            )
          : toast.info(response.data.message);
        break;
      case HTTP_CODE.UNAUTHORIZED:
        toast.info(response.data.message);
        break;
      case HTTP_CODE.NOT_FOUND:
        toast.info(response.data.message);
        break;
      case HTTP_CODE.CONFLICT:
        toast.info(response.data.message);
        break;
    }
  }
};
