//login or register logic full
import axios from 'axios';
import { auth_activate, auth_forgot_password, auth_login, auth_register, auth_reset_password } from '../api/api.tsx';
import toast from 'react-hot-toast';
import React from 'react';
import { consoleClear } from '../console-clear/console-clear.tsx';

export const sliceNumber = (num: string) => {
  if (num.startsWith('+')) return num.slice(1, 13);
  else if (+num.length === 9) return `998${num}`;
  else if (num.startsWith('998')) return num;
  else {
    toast.error('Telefon raqamini to‘g‘ri kiriting. Namuna: +998912223344');
    return '';
  }
};

// register
export const authRegister = (
  event: React.FormEvent<HTMLFormElement>,
  firstName: string,
  lastName: string,
  password: string,
  confirmPassword: string,
  setLoading: (loading: boolean) => void,
  setResData: (val: boolean) => void,
  phoneNumber: string,
): void => {
  event.preventDefault();

  const data = {
    firstName,
    lastName,
    password,
    phoneNumber: sliceNumber(phoneNumber)
  };

  if (firstName && lastName && password && confirmPassword && data.phoneNumber) {
    setLoading(true);
    if (password === confirmPassword) {
      axios.post(`${auth_register}`, data)
        .then(res => {
          consoleClear();
          setLoading(false);
          if (res.data.data) setResData(true);
          else if (res.data.error.message === 'Phone number allaqachon mavjud.') toast.error('Bu telefon raqam bilan alqachon ro\'yhatdan o\'tilgan');
        })
        .catch(() => {
          consoleClear();
          setLoading(false);
        });
    } else {
      setLoading(false);
      toast.error('Parol va takroriy parol mosligini tekshirib qaytadan urinib ko‘ring');
    }
  } else {
    setLoading(false);
    toast.error('Ma\'lumotlar to‘liqligini tekshirib ko‘ring!!!');
  }
};

// register qilingan userni tekshirish
export const registerClientActive = async (
  event: React.FormEvent<HTMLFormElement>,
  code: string,
  setLoading: (val: boolean) => void,
  setResData: (val: boolean) => void
) => {
  event.preventDefault();
  setLoading(true);
  try {
    if (code) {
      const { data } = await axios.put(`${auth_activate}?code=${code}`, '');
      if (data.success) {
        setResData(true);
        setLoading(false);
      } else toast.error('Nimadir xato ketdi, qayta urinib ko‘ring!!!');
    } else {
      toast.error('Кодда хатолик бор, қайта киритинг');
      setLoading(false);
    }
  } catch {
    consoleClear();
    setLoading(false);
    toast.error('Nimadir xato ketdi, qayta urinib ko‘ring!!!');
  }
};

// auth login
export const handleSubmit = async (
  event: React.FormEvent<HTMLFormElement>,
  phoneNumber: string,
  password: string,
  setLoading: (loading: boolean) => void,
  setResData: (val: boolean) => void
) => {
  event.preventDefault();
  const authData = { phoneNumber: sliceNumber(phoneNumber), password };
  setLoading(true);

  if (phoneNumber && password) {
    try {
      const { data } = await axios.post(auth_login, authData);
      if (data.data) {
        setLoading(false);
        const expiryTime = new Date().getTime() + 24 * 60 * 60 * 1000;
        localStorage.setItem('tokenExpiry', expiryTime.toString());
        localStorage.setItem('ROLE', data.data.role);
        localStorage.setItem('token', `Bearer ${data.data.token}`);
        setResData(true);
      } else {
        setLoading(false);
        toast.error(data && data.error.message);
        consoleClear();
      }
    } catch (err: any) {
      if (err.response.data.message === 'Inactive account') toast.error('Sizni kirishingiz taqiqlab quyilgan');
      else toast.error('Login yoki parolni xato kiritdingiz');
      setLoading(false);
      consoleClear();
    }
  } else {
    setLoading(false);
    toast.error('Ma\'lumotlar to‘liqligini tekshirib ko‘ring!!!');
  }
};

//forgot password
export const forgotPasswordEmail = async (
  event: React.FormEvent<HTMLFormElement>,
  setLoading: (val: boolean) => void,
  email: string,
  setResData: (val: boolean) => void
) => {
  event.preventDefault();
  setLoading(true);
  const forgotData = { email };

  try {
    if (email) {
      const { data } = await axios.put(auth_forgot_password, forgotData);
      if (data.success) {
        setResData(true);
        setLoading(false);
      } else {
        setLoading(false);
        toast.error('Nimadir xatolik yuz berdi, keyinroq qayta urinib ko‘ring!!!');
      }
    } else {
      consoleClear();
      setLoading(false);
    }
  } catch (err: any) {
    if (err.response.data['message: '] === 'User not found') toast.error('Bu foydalanuvchi mavjud emas!!!');
    else toast.error('Nimadir xatolik yuz berdi, keyinroq qayta urinib ko‘ring!!!');
    consoleClear();
    setLoading(false);
  }
};

//reset password
export const resetPassword = async (
  event: React.FormEvent<HTMLFormElement>,
  passwordToken: string,
  newPassword: string,
  confirmPassword: string,
  setLoading: (val: boolean) => void,
  setResData: (val: boolean) => void
) => {
  event.preventDefault();
  setLoading(true);
  const resetData = { passwordToken, newPassword, confirmPassword };
  try {
    if (newPassword === confirmPassword) {
      if (passwordToken && newPassword && confirmPassword) {
        const { data } = await axios.put(auth_reset_password, resetData);
        if (data.success) {
          setResData(true);
          setLoading(false);
        } else {
          consoleClear();
          setLoading(false);
          toast.error('Nimadir xatolik yuz berdi, keyinroq qayta urinib ko‘ring!!!');
        }
      } else {
        consoleClear();
        setLoading(false);
        toast.error('Ma\'lumotlar to‘liq emas qaytadan urinib ko‘ring!!!');
      }
    } else {
      consoleClear();
      setLoading(false);
      toast.error('Parollar mosligi to‘g‘ri kelmadi, tekshirib qaytadan urinib ko‘ring!!!');
    }
  } catch {
    consoleClear();
    setLoading(false);
    toast.error('Nimadir xatolik yuz berdi, keyinroq qayta urinib ko‘ring!!!');
  }
};