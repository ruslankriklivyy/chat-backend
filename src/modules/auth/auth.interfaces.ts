export interface IRegisterPayload {
  email: string;
  full_name: string;
  password: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ILogoutPayload {
  refresh_token: string;
}

export interface IRefreshPayload {
  refresh_token: string;
}
