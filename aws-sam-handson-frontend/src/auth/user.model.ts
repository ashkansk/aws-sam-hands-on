export interface User {
  email: string;
  password: string;
}

export interface AuthData {
  email: string;
  password: string;
}

export class UserModel implements User {
  constructor(public email = '', public password = '') {
  }
}
