import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { logger } from '@shared/logger';
import { apiResponse } from "@shared/response";
import middy from "@middy/core";
import { loggingMiddleware } from "@/shared/middleware";

const lambda = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {

    logger.info("The event should be logged before this due to the middleware that has been added to this function.");

    logger.success("This is a success message.")

    return apiResponse.success(200, { response: "This is a successful response" });
};

export const handler = middy(lambda)
.use(loggingMiddleware());
