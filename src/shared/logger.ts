export const logger = {
    success: (message: string): void => {
        console.log(
            JSON.stringify({
                level: "success",
                message: message
            }, null, 4)
        );
    },
    warn: (message: string): void => {
        console.log(
            JSON.stringify({
                level: "warn",
                message: message
            }, null, 4)
        );
    },
    info: (message: string): void => {
        console.log(
            JSON.stringify({
                level: "info",
                message: message
            }, null, 4)
        );
    },
    debug: (message: string): void => {
        console.log(
            JSON.stringify({
                level: "debug",
                message: message
            }, null, 4)
        );
    },
    error: (message: string): void => {
        console.log(
            JSON.stringify({
                level: "error",
                message: message
            }, null, 4)
        );
    },
    object: (object: unknown, level: "INFO" | "WARNING" | "SUCCESS" | "ERROR" | "DEBUG" = "INFO"): void => {
        console.log(
            JSON.stringify({
                level,
                message: JSON.parse(JSON.stringify(object, null, 4))
            }, null, 4)
        );
    },
    thrownError: (error: Error): void => {
        console.log(
            JSON.stringify({
                level: "error",
                message: `ERROR: ${error.message}`
            }, null, 4)
        );
    }
};
