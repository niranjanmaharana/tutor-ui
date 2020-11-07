import { AppConstant } from '../const/app.constant';
import { HttpErrorResponse } from '@angular/common/http';

export class ErrorResponseHandler {
    public static getResponseMessage(errorStatus: number, errorMsg: string): string {
        let msg = '';
        switch (errorStatus) {
            case 0:
                msg = AppConstant.APP_UNAVAILABLE_MSG;
                break;
            case 500:
                msg = AppConstant.SERVER_ERROR_MSG;
                break;
            default:
                msg = errorMsg;
                break;
        }
        return msg;
    }

    public static getResponse(error): string {
        let msg = '';
        let statusCode = error.status;
        if (error.error) {
            statusCode = error.error.statusCode;
        }
        switch (error.statusCode) {
            case 0:
                msg = AppConstant.APP_UNAVAILABLE_MSG;
                break;
            case 500:
                msg = AppConstant.SERVER_ERROR_MSG;
                break;
            default:
                msg = error.error.statusMessage;
                break;
        }
        return msg;
    }

    public static getLoginErrorResponse(error): string {
        let msg = '';
        let statusCode = error.status;
        if (error.status !== 0 && error.error) {
            statusCode = error.error.status;
        }
        switch (statusCode) {
            case 0:
                msg = AppConstant.APP_UNAVAILABLE_MSG;
                break;
            case 500:
                msg = AppConstant.SERVER_ERROR_MSG;
                break;
            default:
                msg = error.error.message;
                break;
        }
        return msg;
    }
}
