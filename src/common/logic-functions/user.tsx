import { consoleClear } from '../console-clear/console-clear.tsx';
import axios from 'axios';
import { config } from '../api/token.tsx';
import { result_archive, result_date_edit, result_status_edit, user_list } from '../api/api.tsx';
import toast from 'react-hot-toast';

export const userAllList = async (
  {
    page,
    setTotalPage,
    name,
    regionId,
    districtId,
    setData,
    setLoading
  }: {
    page: number,
    setTotalPage: (val: number) => void,
    name?: string,
    regionId?: string | number,
    districtId?: string | number,
    setData: (val: any) => void,
    setLoading: (val: boolean) => void
  }) => {

  setLoading(true);
  try {
    const queryParams: string = [
      name ? `keyword=${name}` : '',
      districtId ? `districtId=${districtId}` : '',
      regionId ? `regionId=${regionId}` : ''
    ].filter(Boolean).join('&');

    const url: string = `${user_list}?page=${page}&size=10${queryParams ? `&${queryParams}` : ''}`;
    const { data } = await axios.get(url, config);
    if (data.success) {
      setData(data.body.body);
      setTotalPage(data.body.totalElements);
      setLoading(false);
    } else {
      setData(null);
      setLoading(false);
    }
  } catch (e) {
    setData(null);
    setLoading(false);
    consoleClear();
  }
};

// result archive
export const UserResultArchive = async ({ setData, setLoading, resultID }: {
  setData: (val: any[] | null) => void,
  setLoading: (val: boolean) => void,
  resultID: string
}) => {

  setLoading(true);
  try {
    const { data } = await axios.get(`${result_archive}${resultID}`, config);
    if (data.success) {
      setData(data.body);
      setLoading(false);
    } else {
      setData(null);
      setLoading(false);
    }
  } catch (err) {
    setData(null);
    setLoading(false);
    consoleClear();
  }
};

//result edit status
export const statusUpdate = async ({ status, ball, resultID, getUser, close }: {
  status: string,
  ball?: string,
  resultID: string | number,
  getUser: () => void,
  close: () => void,
}) => {
  try {
    const { data } = await axios.put(`${result_status_edit}${resultID}?status=${status}${status === 'APPROVED' ? `&practicalScore=${ball}` : ''}`, '', config);
    if (data.success) {
      getUser();
      toast.success(`${status === 'APPROVED' ? 'Натижани муваффақиятли тасдиқладингиз' : 'Натижани бекор қилдингиз'}`);
      close();
    } else {
      getUser();
      close();
      toast.error(`Нимадир хатолик юз берди`);
    }
  } catch (err) {
    close();
    consoleClear();
  }
};

//qayta test ga ruxsat berish
export const backTestEditDate = async ({ userId, categoryId, closeModal, fetchData }: {
  userId: string | number,
  // expiredDate: number | string,
  categoryId: string,
  closeModal: () => void,
  fetchData: () => void
}) => {
  try {
    const { data } = await axios.put(`${result_date_edit}?userId=${userId}&categoryId=${categoryId}`, '', config);
    if (data.success) {
      closeModal();
      fetchData();
      toast.success(`Сиз тест ишлашга рухсат бердингиз`);
    } else {
      fetchData();
      closeModal();
      toast.error(`Нимадир хатолик юз берди`);
    }
  } catch (err) {
    toast.error(`Нимадир хатолик юз берди`);
    closeModal();
    consoleClear();
  }
};