const ERRORS = {
  NETWORK_ERROR: {
    message: "Failed to Communicate with our Server.",
    action: "SHOW_TOAST",
  },

  INTERNAL_SERVER_ERROR: {
    message: "Internal Server Error. Please Try again.",
    action: "SHOW_TOAST",
  },

  ACCOUNT_NOT_FOUND: {
    message: "Account doesn't exists!",
    action: "SHOW_TOAST",
  },

  PROFILE_NOT_FOUND: {
    action: "REDIRECT_HOME",
  },

  NOT_LOGGED_IN: {
    action: "DO_NOTHING",
  },

  CANNOT_ACCESS_PAGE: {
    action: "REDIRECT_HOME",
  },

  WRONG_PASSWORD: {
    message: "Incorrect password. Please try again.",
    action: "SHOW_TOAST",
  },

  FAILED_TO_UPDATE_STATUS: {
    action: "REDIRECT_HOME",
  },

  HELP_LIMITS_REACHED: {
    message: "You have reached your limits.",
    action: "SHOW_TOAST",
  },
};

export default ERRORS;
