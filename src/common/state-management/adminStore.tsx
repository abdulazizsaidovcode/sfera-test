import { create } from 'zustand';
import { Admin, AdminData, AdminDataList } from '../../types/admin.ts';

const adminStore = create<Admin>((set) => ({
  addData: {
    firstname: '',
    lastname: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    role: ''
  },
  setAddData: (val: AdminData) => set({ addData: val }),
  getAdminList: null,
  setGetAdminList: (val: AdminDataList[] | null) => set({ getAdminList: val }),
  page: 0,
  setPage: (val: any) => set({ page: val }),
  totalPage: 0,
  setTotalPage: (val: any) => set({ totalPage: val }),
}));

export default adminStore;