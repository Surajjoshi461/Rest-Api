export interface EmptyObject {
    [key: string]: void;
  }
  
  export class ApiResponse<T = EmptyObject> {
    public status: number;
    public message: string;
    public body: T;
  
    constructor(status: number, message: string, body: T) {
      this.status = status;
      this.message = message;
      this.body = body;
    }
  }
  