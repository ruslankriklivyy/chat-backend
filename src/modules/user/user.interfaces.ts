export interface IUser {
  id: number;
  email: string;
  full_name: string;
  avatar_url: string;
  password: string;
  is_online: boolean;
  room_ids: number[];
}

export interface ICreateUserPayload {
  body: { data: string };
  avatar: any;
}

export interface IUpdateUserPayload {
  field: string;
  value: any;
}
