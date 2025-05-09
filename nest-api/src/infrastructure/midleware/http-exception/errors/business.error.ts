export class BusinessError extends Error {
    constructor(
      public readonly message: string,
      public readonly code: number = 400,
    ) {
      super(message);
    }
  }