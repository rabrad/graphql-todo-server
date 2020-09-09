export const Errors = {
  TodoNotFound: {
    status: 404,
    message: 'Todo not found!.',
  },

  Unauthorized: {
    status: 401,
    message: 'Authentication credentials not valid.',
  },

  Forbidden: {
    status: 403,
    message: "You're missing permission to execute this request.",
  },
}

export class AppErrors extends Error {
  public response: {status: number; message: string; detail?: string}

  constructor(error: {status: number; message: string}, detail?: string) {
    super(error.message)
    this.response = {status: error.status, message: error.message, detail: detail}
  }
}
