import { APIGatewayProxyResult } from "aws-lambda";

import { apiResponse } from "@/shared/response";

export const getRequest = async (): Promise<APIGatewayProxyResult> => {
    return apiResponse.success(200, { response: "This is a success message from a GET request." });
};
