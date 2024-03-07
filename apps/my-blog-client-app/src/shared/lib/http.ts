export const HTTP_METHOD_GET = "GET";
export const HTTP_METHOD_POST = "POST";
export const HTTP_METHOD_PUT = "PUT";
export const HTTP_METHOD_DELETE = "DELETE";

export const HTTP_HEADERS_COOKIE_NAME = "Cookie";
export const HTTP_HEADERS_CONTENT_TYPE_NAME = "Content-Type";

export const CONTENT_TYPE_JSON = "application/json;charset=utf-8";

const getRequest = async <TResponseBody>(url: string) => {
    const response = await fetch(url, {
        method: HTTP_METHOD_GET,
    });

    const responseBody: TResponseBody = await response.json();
    return responseBody;
};

const modifyRequest = async <TResponseBody, TRequestBody = void>(
    url: string,
    method: string,
    body: TRequestBody | void
) => {
    const response = await fetch(url, {
        method,
        headers: {
            [HTTP_HEADERS_CONTENT_TYPE_NAME]: CONTENT_TYPE_JSON,
        },
        body: body ? JSON.stringify(body) : null,
    });

    const responseBody: TResponseBody = await response.json();
    return responseBody;
};

const postRequest = async <TResponseBody, TRequestBody = void>(
    url: string,
    body: TRequestBody | void
) => {
    return modifyRequest<TResponseBody, TRequestBody>(
        url,
        HTTP_METHOD_POST,
        body
    );
};

const putRequest = async <TResponseBody, TRequestBody = void>(
    url: string,
    body: TRequestBody | void
) => {
    return modifyRequest<TResponseBody, TRequestBody>(
        url,
        HTTP_METHOD_PUT,
        body
    );
};

const deleteRequest = async <TResponseBody, TRequestBody = void>(
    url: string,
    body: TRequestBody | void
) => {
    return modifyRequest<TResponseBody, TRequestBody>(
        url,
        HTTP_METHOD_DELETE,
        body
    );
};

export const request = {
    get: getRequest,
    post: postRequest,
    put: putRequest,
    delete: deleteRequest,
};
