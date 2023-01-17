import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { apiResponse, HttpStatusCode } from "./response";

interface IRequest {
    GET?: () => Promise<APIGatewayProxyResult>;
    POST?: () => Promise<APIGatewayProxyResult>;
    PUT?: () => Promise<APIGatewayProxyResult>;
    DELETE?: () => Promise<APIGatewayProxyResult>;
}

export const handleRequest = async (
    event: APIGatewayProxyEvent,
    requestHandlers: IRequest)
: Promise<APIGatewayProxyResult> => {

    if(!event?.httpMethod) {
        return apiResponse.error(HttpStatusCode.BAD_REQUEST, new Error("Invalid source event."));
    }

    const hasMethod = event.httpMethod in requestHandlers;

    const method = requestHandlers[event.httpMethod as keyof IRequest];

    if(!hasMethod || !method) {
        return apiResponse.error(HttpStatusCode.BAD_REQUEST, new Error(`Unable to handle ${event.httpMethod} request. This method has not been implemented.`));
    }

    return await method();
};
