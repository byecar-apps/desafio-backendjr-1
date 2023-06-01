export interface IUser {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRegisterUser {
  email: string;
  password: string;
}
