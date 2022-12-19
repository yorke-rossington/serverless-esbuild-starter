import { APIGatewayProxyResult } from "aws-lambda";

import { logger } from "./logger";

interface IResponse {
    statusCode: number;
    headers: Record<string, string>;
    body: string;
}

const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
};

export const apiResponse = {
    success: (
        statusCode = 200,
        data = {}
    ): APIGatewayProxyResult => {
        /** Generate default response with no data */
        const response: IResponse = {
            statusCode,
            headers,
            body: JSON.stringify({})
        };

        response.body = JSON.stringify(data);

        return response;
    },
    error: (statusCode: number, err: Error): APIGatewayProxyResult => {
        /** Log the error */
        logger.thrownError(err);

        /** Generate default response with no error  */
        const response: IResponse = {
            statusCode,
            headers,
            body: JSON.stringify({
                error: err.message === ""
                    ? "There was an error. Please try again later."
                    : err.message
            })
        };

        return response;
    },
    unhandledError: (statusCode: number, err: Error): APIGatewayProxyResult => {
        /** Log the error */
        logger.debug("UNHANDLED ERROR");

        if (err.message) {
            logger.thrownError(err);
        }

        /** Generate default response with no error  */
        const response: IResponse = {
            statusCode,
            headers,
            body: JSON.stringify({ error: "Something went wrong" })
        };

        return response;
    }
};

/**
 * Hypertext Transfer Protocol (HTTP) response status codes.
 * @see {@link https://en.wikipedia.org/wiki/List_of_HTTP_status_codes}
 */
export enum HttpStatusCode {

    /**
     * Standard response for successful HTTP requests.
     * The actual response will depend on the request method used.
     * In a GET request, the response will contain an entity corresponding to the requested resource.
     * In a POST request, the response will contain an entity describing or containing the result of the action.
     */
    OK = 200,

    /**
     * The request has been fulfilled, resulting in the creation of a new resource.
     */
    CREATED = 201,

    /**
     * The request has been accepted.
     */
    ACCEPTED = 202,

    /**
     * The server successfully processed the request and is not returning any content.
     */
    NO_CONTENT = 204,

    /**
     * The server cannot or will not process the request due to an apparent client error
     * (e.g., malformed request syntax, too large size, invalid request message framing, or deceptive request routing).
     */
    BAD_REQUEST = 400,

    /**
     * Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet
     * been provided. The response must include a WWW-Authenticate header field containing a challenge applicable to the
     * requested resource. See Basic access authentication and Digest access authentication. 401 semantically means
     * "unauthenticated",i.e. the user does not have the necessary credentials.
     */
    UNAUTHORIZED = 401,

    /**
     * The request was valid, but the server is refusing action.
     * The user might not have the necessary permissions for a resource.
     */
    FORBIDDEN = 403,

    /**
     * The requested resource could not be found but may be available in the future.
     * Subsequent requests by the client are permissible.
     */
    NOT_FOUND = 404,

    /**
     * A request method is not supported for the requested resource;
     * for example, a GET request on a form that requires data to be presented via POST,
     * or a PUT request on a read-only resource.
     */
    METHOD_NOT_ALLOWED = 405,

    /**
     * The request entity has a media type which the server or resource does not support.
     * For example, the client uploads an image as image/svg+xml,
     * but the server requires that images use a different format.
     */
    UNSUPPORTED_MEDIA_TYPE = 415,

    /**
     * A generic error message, given when an unexpected condition was encountered
     * and no more specific message is suitable.
     */
    INTERNAL_SERVER_ERROR = 500,

    /**
     * The server either does not recognize the request method, or it lacks the ability to fulfill the request.
     * Usually this implies future availability (e.g., a new feature of a web-service API).
     */
    NOT_IMPLEMENTED = 501,

    /**
     * The server was acting as a gateway or proxy and received an invalid response from the upstream server.
     */
    BAD_GATEWAY = 502,

    /**
     * The server is unavailable and is not ready to handle the request.
     * This could be due to when it is down for maintenance or a deployment.
     */
    SERVICE_UNAVAILABLE = 503
}
