export enum ErrorCode {
    BadUserCredentials = "BadUserCredentials",
    NotFound = "NotFound",
}

type OkResult<TPayload = null> = {
    ok: true;
    payload: TPayload;
};

type ErrorResult = {
    ok: false;
    errorCode: ErrorCode;
};

export type Result<TPayload = null> = OkResult<TPayload> | ErrorResult;

const ok = <TPayload = null>(payload: TPayload = null): OkResult<TPayload> => ({
    ok: true,
    payload,
});

const error = (errorCode: ErrorCode): ErrorResult => ({
    ok: false,
    errorCode,
});

export const result = {
    ok,
    error: Object.values(ErrorCode).reduce((result, errorCode) => {
        result[errorCode] = error(errorCode);
        return result;
    }, {} as Record<ErrorCode, ErrorResult>),
};
