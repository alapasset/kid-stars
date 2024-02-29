export interface UserCreationForm {
  email: string;
  password: string;
  confirmationPassword: string;
}

export interface UserLoginForm {
  email: string;
  password: string;
}
