export enum ErrorCode {
    BadUserCredentials = "BadUserCredentials",
    NotFound = "NotFound",
}

type OkResult<TPayload> = {
    ok: true;
    payload: TPayload;
};

type ErrorResult = {
    ok: false;
    errorCode: ErrorCode;
};

export type Result<TPayload> = OkResult<TPayload> | ErrorResult;

type Errors = Record<ErrorCode, ErrorResult>;

const ok = <TPayload>(payload: TPayload): OkResult<TPayload> => ({
    ok: true,
    payload,
});

const error = (errorCode: ErrorCode): ErrorResult => ({
    ok: false,
    errorCode,
});

const getErrorsCodes = () =>
    Object.values(ErrorCode).reduce((result, errorCode) => {
        result[errorCode] = error(errorCode);
        return result;
    }, {} as Errors);

export const result = {
    ok,
    errors: getErrorsCodes(),
};
