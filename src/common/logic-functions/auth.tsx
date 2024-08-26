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
    toast.error('Телефон рақамни туғри киритинг. Намуна: +998912223344');
    return '';
  }
};

// register
export const authRegister = (
  event: React.FormEvent<HTMLFormElement>,
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  confirmPassword: string,
  setLoading: (loading: boolean) => void,
  setResData: (val: boolean) => void,
  phoneNumber: string,
  gender: string | null
): void => {
  event.preventDefault();

  const data = {
    firstname,
    lastname,
    email,
    password,
    confirmPassword,
    phoneNumber: sliceNumber(phoneNumber)
  };

  if (firstname && lastname && email && password && confirmPassword && data.phoneNumber && gender) {
    setLoading(true);
    if (password === confirmPassword) {
      axios.post(`${auth_register}?genderType=${gender}`, data)
        .then(res => {
          consoleClear();
          setLoading(false);
          if (res.data.success) setResData(true);
          else toast.error('Нимадир хато кетди, қайта уриниб кўринг');
        })
        .catch((err) => {
          consoleClear();
          setLoading(false);
          if (err.response.data.message === 'This email exist') toast.error('Бу эмаил билан руйхатдан утилган!!!');
          else toast.error('Нимадир хато кетди, қайта уриниб кўринг!!!');
        });
    } else {
      setLoading(false);
      toast.error('Парол ва такрорий парол мослигини текшириб қайтадан уриниб куринг');
    }
  } else {
    setLoading(false);
    toast.error('Малумотлар тулиқлигини текшириб куринг!!!');
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
        consoleClear();
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
  email: string,
  password: string,
  setLoading: (loading: boolean) => void,
  setResData: (val: boolean) => void
) => {
  event.preventDefault();
  const authData = { email, password };
  setLoading(true);

  if (email && password) {
    try {
      const { data } = await axios.post(auth_login, authData);
      if (data.success) {
        setLoading(false);
        const expiryTime = new Date().getTime() + 24 * 60 * 60 * 1000;
        localStorage.setItem('tokenExpiry', expiryTime.toString());
        localStorage.setItem('ROLE', data.role);
        localStorage.setItem('token', `Bearer ${data.token}`);
        setResData(true);
        consoleClear();
      } else {
        setLoading(false);
        toast.error('Сиз хали руйхатдан утмагансиз');
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
    toast.error('Малумотлар тулиқлигини текшириб куринг!!!');
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
        consoleClear();
        setResData(true);
        setLoading(false);
      } else {
        consoleClear();
        setLoading(false);
        toast.error('Нимадур хатолик юз берди, кейинроқ қайта уриниб куринг!!!');
      }
    } else {
      consoleClear();
      setLoading(false);
    }
  } catch (err: any) {
    if (err.response.data['message: '] === 'User not found') toast.error('Бу фойдаланувчи мавжуд эмас!!!');
    else toast.error('Нимадур хатолик юз берди, кейинроқ қайта уриниб куринг!!!');
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
          consoleClear();
          setResData(true);
          setLoading(false);
        } else {
          consoleClear();
          setLoading(false);
          toast.error('Нимадур хатолик юз берди, кейинроқ қайта уриниб куринг!!!');
        }
      } else {
        consoleClear();
        setLoading(false);
        toast.error('Малумотлар тулиқ эмас қайтадан уриниб куринг!!!');
      }
    } else {
      consoleClear();
      setLoading(false);
      toast.error('Пароллар мослиги туғри келмади, текшириб қайтадан уриниб куринг!!!');
    }
  } catch {
    consoleClear();
    setLoading(false);
    toast.error('Нимадур хатолик юз берди, кейинроқ қайта уриниб куринг!!!');
  }
};