export interface Auth {
  firstName: string;
  setFirstName(firstName: string): void;
  lastName: string;
  setLastName(lastName: string): void;
  email: string;
  setEmail(val: string): void;
  password: string;
  setPassword(val: string): void;
  prePassword: string;
  setPrePassword(val: string): void;
  confirmEmailCode: string
  setConfirmEmailCode(val: string): void;
  phoneNumber: string
  setPhoneNumber(val: string): void;
  gender: string|null
  setGender(val: string|null): void;
}