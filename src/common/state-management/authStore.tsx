import { create } from 'zustand';
import { Auth } from '../../types/auth.ts';

const authStore = create<Auth>((set) => ({
  email: '',
  setEmail: (val: string) => set({ email: val }),
  password: '',
  setPassword: (val: string) => set({ password: val }),
  firstName: '',
  setFirstName: (val: string) => set({ firstName: val }),
  lastName: '',
  setLastName: (val: string) => set({ lastName: val }),
  prePassword: '',
  setPrePassword: (val: string) => set({ prePassword: val }),
  confirmEmailCode: '',
  setConfirmEmailCode: (val: string) => set({ confirmEmailCode: val }),
  phoneNumber: '',
  setPhoneNumber: (val: string) => set({ phoneNumber: val }),
  gender: null,
  setGender: (val: string|null) => set({ gender: val })
}));

export default authStore;