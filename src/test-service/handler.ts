import middy from "@middy/core";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { loggingMiddleware } from "@/shared/middleware";
import { handleRequest } from "@/shared/request";

import { getRequest } from "./src/GET";
import { postRequest } from "./src/POST";

const handler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {

    return await handleRequest(
        event,
        {
            GET: getRequest,
            POST: postRequest
        }
    );
};

export const lambda = middy(handler)
    .use(loggingMiddleware());
