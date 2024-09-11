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
    toast.error('Телефон рақамини тўғри киритинг. Намуна: +998912223344');
    return '';
  }
};

// register
export const authRegister = (
  event: React.FormEvent<HTMLFormElement>,
  firstname: string,
  lastname: string,
  password: string,
  confirmPassword: string,
  setLoading: (loading: boolean) => void,
  setResData: (val: boolean) => void,
  phoneNumber: string,
): void => {
  event.preventDefault();

  const data = {
    firstname,
    lastname,
    password,
    phoneNumber: sliceNumber(phoneNumber)
  };

  if (firstname && lastname && password && confirmPassword && data.phoneNumber) {
    setLoading(true);
    if (password === confirmPassword) {
      axios.post(`${auth_register}`, data)
        .then(res => {
          consoleClear();
          setLoading(false);
          if (res.data.data) setResData(true);
          else if (res.data.error.message === 'Phone number allaqachon mavjud.') toast.error('Бу э-маил билан рўйхатдан утилган!!!');
        })
        .catch(() => {
          consoleClear();
          setLoading(false);
        });
    } else {
      setLoading(false);
      toast.error('Парол ва такрорий парол мослигини текшириб қайтадан уриниб кўринг');
    }
  } else {
    setLoading(false);
    toast.error('Маълумотлар тўлиқлигини текшириб кўринг!!!');
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
      } else toast.error('Нимадир хато кетди, қайта уриниб кўринг!!!');
    } else {
      toast.error('Кодда хатолик бор, қайта киритинг');
      setLoading(false);
    }
  } catch {
    consoleClear();
    setLoading(false);
    toast.error('Нимадир хато кетди, қайта уриниб кўринг!!!');
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
      if (err.response.data.message === 'Inactive account') toast.error('Сизни киришингиз тақиқлаб қуйилган');
      else toast.error('Логин ёки паролни хато киритдингиз');
      setLoading(false);
      consoleClear();
    }
  } else {
    setLoading(false);
    toast.error('Маълумотлар тўлиқлигини текшириб кўринг!!!');
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
        toast.error('Нимадир хатолик юз берди, кейинроқ қайта уриниб кўринг!!!');
      }
    } else {
      consoleClear();
      setLoading(false);
    }
  } catch (err: any) {
    if (err.response.data['message: '] === 'User not found') toast.error('Бу фойдаланувчи мавжуд эмас!!!');
    else toast.error('Нимадир хатолик юз берди, кейинроқ қайта уриниб кўринг!!!');
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
          toast.error('Нимадир хатолик юз берди, кейинроқ қайта уриниб кўринг!!!');
        }
      } else {
        consoleClear();
        setLoading(false);
        toast.error('Маълумотлар тўлиқ эмас қайтадан уриниб кўринг!!!');
      }
    } else {
      consoleClear();
      setLoading(false);
      toast.error('Пароллар мослиги тўғри келмади, текшириб қайтадан уриниб кўринг!!!');
    }
  } catch {
    consoleClear();
    setLoading(false);
    toast.error('Нимадир хатолик юз берди, кейинроқ қайта уриниб кўринг!!!');
  }
};