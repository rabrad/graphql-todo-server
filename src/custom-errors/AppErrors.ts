export const Errors = {
  TodoNotFound: {
    status: 404,
    message: 'Todo not found.',
  },

  Unauthorized: {
    status: 401,
    message: 'Authentication credentials not valid.',
  },

  SessionExpired: {
    status: 403,
    message: 'Your session is expired, please login again.',
  },

  UserNotFound: {
    status: 404,
    message: 'User not found.',
  },
}

export class AppErrors extends Error {
  public response: {status: number; message: string; detail?: string}

  constructor(error: {status: number; message: string}, detail?: string) {
    super(error.message)
    this.response = {status: error.status, message: error.message, detail: detail}
  }
}
