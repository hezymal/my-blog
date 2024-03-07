export enum ErrorCode {
    BadUserCredentials = "BadUserCredentials",
    NotFound = "NotFound",
}

export type OkResult<TPayload> = { ok: true; payload: TPayload; };

export type ErrorResult = { ok: false; errorCode: ErrorCode; };

export type Result<TPayload> = OkResult<TPayload> | ErrorResult;

const ok = <TPayload>(payload: TPayload): OkResult<TPayload> => ({
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
