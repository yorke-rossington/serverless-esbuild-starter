import middy from "@middy/core";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { logger } from "./logger";

/**
 * Logs all incoming events
 */
export const loggingMiddleware = (): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {

    const databaseMiddlewareBefore: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> =
        async (request): Promise<void | APIGatewayProxyResult> => {
                logger.object(request.event);
        };

    return {
        before: databaseMiddlewareBefore
    };
};
