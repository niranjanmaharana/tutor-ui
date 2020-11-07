export class AppConstant {
    static APP_UNAVAILABLE_MSG = 'Application unavailable!';
    static UNAUTHORIZED_MSG = 'Unauthorized access!';
    static SERVER_ERROR_MSG = 'Internal server error!';
    static RESOURCE_NOT_FOUND_MSG = 'Resource not found!';
    static IDLE_TIME: number = 60 * 30;
    static TIMEOUT_INTERVAL = 60;
    static PING_INTERVAL = 60;
    /**
     * The token will be refreshed after each UPDT_TKN_INTRVL interval of time
     */
    static UPDT_TKN_INTRVL: number = 10 * 60 * 1000;
    static LOGOUT_WARNING_MSG = 'Your session will be logged out soon. To continue working with your current session select Continue Working.';
}