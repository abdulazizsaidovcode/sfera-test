import React from 'react';
import { AdminData, AdminDataList } from '../../types/admin.ts';
import { consoleClear } from '../console-clear/console-clear.tsx';
import toast from 'react-hot-toast';
import axios from 'axios';
import { addAdmin, adminIsActives, getAdminList } from '../api/api.tsx';
import { config } from '../api/token.tsx';
import { sliceNumber } from './auth.tsx';

export const adminIsActive = async (id: number | string, setData: (val: AdminDataList[] | null) => void, setLoading: (val: boolean) => void, page: any, setTotalPage: (val: any) => void) => {
  try {
    const { data } = await axios.put(`${adminIsActives}${id}`, '', config);
    if (data.success) {
      await getAdminLists(setData, setLoading, page, setTotalPage);
      toast.success('Ўзгариш муваффақиятли бажарилди');
    } else {
      toast.error('Нимадир хатолик юз берди');
      consoleClear();
    }
  } catch (err) {
    toast.error('Нимадир хатолик юз берди');
    consoleClear();
  }
};

export const postAdmin = async (
  event: React.FormEvent<HTMLFormElement>,
  addData: AdminData,
  setLoading: (val: boolean) => void,
  setResData: (val: boolean) => void
) => {
  event.preventDefault();
  setLoading(true);

  try {
    if (addData.password === addData.confirmPassword) {
      if (addData.firstname && addData.lastname && addData.email && sliceNumber(addData.phoneNumber) && addData.role && addData.password && addData.confirmPassword) {
        const { data } = await axios.post(addAdmin, {
          firstname: addData.firstname,
          lastname: addData.lastname,
          email: addData.email,
          phoneNumber: sliceNumber(addData.phoneNumber),
          role: addData.role,
          password: addData.password,
          confirmPassword: addData.confirmPassword
        }, config);
        if (data.success) {
          setResData(true);
          setLoading(false);
          toast.success('Админ муваффақиятли қўшилди');
        } else {
          setLoading(false);
          toast.error('Нимадир хатолик юз берди, кейинроқ қайта уриниб кўринг');
        }
      } else {
        toast.error('Маълумотлар тўлиқлигини текшириб кўринг');
        setLoading(false);
      }
    } else {
      setLoading(false);
      toast.error('Пароллар мослиги тўғри келмади');
      consoleClear();
    }
  } catch (err: any) {
    setLoading(false);
    if (err.response.data.message === 'This email exist') toast.error('Бу электрон почта мавжуд бошқа электрон почта билан уриниб кўринг');
    else toast.error('Нимадир хатолик юз берди, кейинроқ қайта уриниб кўринг');
    consoleClear();
  }
};

export const getAdminLists = async (setData: (val: AdminDataList[] | null) => void, setLoading: (val: boolean) => void, page: any, setTotalPage: (val: any) => void) => {
  setLoading(true);
  try {
    const { data } = await axios.get(`${getAdminList}?page=${page}&size=10`, config);
    if (data.success) {
      setData(data.body.body);
      setTotalPage(data.body.totalElements);
      setLoading(false);
    } else {
      setLoading(false);
      setData(null);
      consoleClear();
    }
  } catch {
    setData(null);
    setLoading(false);
    consoleClear();
  }
};