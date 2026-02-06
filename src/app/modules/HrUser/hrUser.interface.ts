export interface IHrUser {
    id?: number;
    email: string;
    password_hash: string;
    name: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface IHRUserResponse extends Omit<IHrUser, "password_hash"> { }

export interface IHRUserCreateInput {
  name: string;
  email: string;
  password: string;
}