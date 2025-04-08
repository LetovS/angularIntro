export class NotFoundError extends Error {
    constructor(
      public readonly message: string,
      public readonly code: number = 404,
    ) {
      super(message);
    }
  }