import { v4 as uuidv4 } from "uuid";

export default {
  GENERATE_UUID: (): string => uuidv4(),
  ControllerMessage: {
    SUCCESS: "Success",
    CREATED: "Created",
    DELETED: "Deleted",
    FAILED: "Failed",
    UPDATED: "Updated",
  }
}
