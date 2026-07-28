export const STORAGE_KEYS = {
  AUTH_TOKEN: '@alive_auth_token',
  REFRESH_TOKEN: '@alive_refresh_token',
  USER_DATA: '@alive_user_data',
  SETTINGS: '@alive_app_settings',
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

export const API_TIMEOUTS = {
  DEFAULT: 15000,
  UPLOAD: 60000,
  LONG_POLLING: 30000,
} as const;
