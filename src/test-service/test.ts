import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { logger } from '@shared/logger';
import { apiResponse } from "@shared/response";

export const handler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {

    logger.info("This logs some information.");

    logger.object(event, "DEBUG");

    return apiResponse.success(200, { response: "This is a successful response" });
};
