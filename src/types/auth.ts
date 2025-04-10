
export type UserType = 'student' | 'faculty';

export interface UserCredentials {
  email: string;
  password: string;
}

export interface SignupData extends UserCredentials {
  name: string;
  userType: UserType;
}
