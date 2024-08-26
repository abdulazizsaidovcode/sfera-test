import { create } from 'zustand';
import { Global, Regions } from '../../types/global.ts';

const globalStore = create<Global>((set) => ({
  region: null,
  setRegion: (val: Regions[] | null) => set({ region: val }),
  district: null,
  setDistrict: (val: Regions[] | null) => set({ district: val }),
  isLoading: false,
  setIsLoading: (val: boolean) => set({ isLoading: val }),
  resData: false,
  setResData: (val: boolean) => set({ resData: val }),
  selectVal: '',
  setSelectVal: (val: string) => set({ selectVal: val }),
  getMeData: null,
  setGetMeData: (val: any | null) => set({ getMeData: val }),
  imgUpload: null,
  setImgUpload: (val: any) => set({ imgUpload: val }),
  passwordShow: false,
  setPasswordShow: (val: boolean) => set({ passwordShow: val }),
}));

export default globalStore;