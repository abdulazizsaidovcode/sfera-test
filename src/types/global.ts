export interface Global {
  region: Regions[] | null;
  setRegion: (region: Regions[] | null) => void;
  district: Regions[] | null;
  setDistrict: (district: Regions[] | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  resData: boolean;
  setResData: (data: boolean) => void;
  selectVal: string;
  setSelectVal: (val: string) => void;
  getMeData: null | any;
  setGetMeData: (data: any | null) => void;
  imgUpload: any
  setImgUpload: (val: any) => void;
  passwordShow: boolean
  setPasswordShow: (val: boolean) => void;
}

export interface Regions {
  id: number
  name: string
}