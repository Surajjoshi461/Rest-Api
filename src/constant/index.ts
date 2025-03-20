import { v4 as uuidv4 } from "uuid";

export default {
    GENERATE_UUID: (): string => uuidv4(),
    ControllerMessage: {
        SUCCESS: "Success",
        CREATED: "Created",
        DELETED: "Deleted",
        FAILED: "Failed",
        UPDATED: "Updated",
    },
    EXPRESS_ERRORS: {
        INTERNAL_SERVER_ERROR: 'Something went wrong',
    },
    VALIDATION: {
        UNAUTHORIZE: 'You are not authorize to perform access',
        TOKEN_MISSING: 'Token missing from header',
        TOKEN_EXPIRED: 'Token Expired',
        USER_NOT_FOUND: 'User not found',
        INCORRECT_PASSWORD: 'Incorrect password'
    }
}
