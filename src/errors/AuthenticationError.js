class AuthenticationError extends Error {
    constructor(message="User is not logged in") {
      super(message)
      this.name = "AuthenticationError"
    }
  }