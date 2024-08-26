export interface Admin {
  addData: AdminData;
  setAddData: (val: AdminData) => void;
  getAdminList: null | AdminDataList[];
  setGetAdminList: (val: AdminDataList[] | null) => void;
  page: any,
  setPage: (val: any) => void;
  totalPage: any,
  setTotalPage: (val: any) => void;
}

export interface AdminData {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  role: string
}

export interface AdminDataList {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  enabled?: boolean
}