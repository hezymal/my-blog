import { type NextRequest } from "next/server";
import * as http from "@client-app/shared/lib/http";

const MY_BLOG_API_PROTOCOL = "http";
const MY_BLOG_API_HOST = process.env.MY_BLOG_API_HOST;
const MY_BLOG_API_PORT = process.env.MY_BLOG_API_PORT;

const ALLOWED_HEADERS_NAMES = [
    http.HTTP_HEADERS_COOKIE_NAME,
    http.HTTP_HEADERS_CONTENT_TYPE_NAME,
];

const buildApiUrl = (relativeUrl: string) => {
    return `${MY_BLOG_API_PROTOCOL}://${MY_BLOG_API_HOST}:${MY_BLOG_API_PORT}${relativeUrl}`;
};

const buildHeaders = (request: NextRequest) => {
    const headers: Record<string, string> = {};

    for (const name of ALLOWED_HEADERS_NAMES) {
        if (request.headers.has(name)) {
            headers[name] = request.headers.get(name)!;
        }
    }

    return headers;
};

const logRequest = (request: NextRequest) => {
    console.log("[ request ]", request.method, request.url);
};

export async function GET(request: NextRequest) {
    logRequest(request);

    const url = buildApiUrl(request.nextUrl.pathname);
    const headers = buildHeaders(request);
    const response = await fetch(url, {
        method: http.HTTP_METHOD_GET,
        headers,
    });
    return response;
}

export async function POST(request: NextRequest) {
    logRequest(request);

    const url = buildApiUrl(request.nextUrl.pathname);
    const headers = buildHeaders(request);
    const body = (await request.text()) || null;
    const response = await fetch(url, {
        method: http.HTTP_METHOD_POST,
        headers,
        body,
    });
    return response;
}

export async function PUT(request: NextRequest) {
    logRequest(request);

    const url = buildApiUrl(request.nextUrl.pathname);
    const headers = buildHeaders(request);
    const body = (await request.text()) || null;
    const response = await fetch(url, {
        method: http.HTTP_METHOD_PUT,
        headers,
        body,
    });
    return response;
}

export async function DELETE(request: NextRequest) {
    logRequest(request);

    const url = buildApiUrl(request.nextUrl.pathname);
    const headers = buildHeaders(request);
    const body = (await request.text()) || null;
    const response = await fetch(url, {
        method: http.HTTP_METHOD_DELETE,
        headers,
        body,
    });
    return response;
}
