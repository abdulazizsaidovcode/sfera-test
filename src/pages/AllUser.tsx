import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import UniversalTable, { IThead } from '../components/Tables/UniversalTable.tsx';
import { BiShow } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import GlobalModal from '../components/modal/modal.tsx';
import { Pagination, Select } from 'antd';
import PendingLoader from '../common/Loader/pending-loader.tsx';
import { userAllList } from '../common/logic-functions/user.tsx';
import { getDistrict, getRegions } from '../common/global-functions';
import globalStore from '../common/state-management/globalStore.tsx';
import { consoleClear } from '../common/console-clear/console-clear.tsx';
import axios from 'axios';
import { user_list } from '../common/api/api.tsx';
import { config } from '../common/api/token.tsx';
import moment from 'moment';

const { Option } = Select;

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  enabled: boolean;
  access: boolean;
}

export interface IUserDetails {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: null | string;
  dateOfBirth: null | string;
  street: null | string;
  districtName: null | string;
  regionName: null | string;
}

const thead: IThead[] = [
  { id: 1, name: 'Т/р' },
  { id: 2, name: 'Исм' },
  { id: 3, name: 'Фамелия' },
  { id: 4, name: 'Электрон почта' },
  // { id: 5, name: 'Тестга рухсат бериш' },
  { id: 6, name: 'Ҳаракат' }
];

const AllUser = () => {
  const { region, setRegion, district, setDistrict, resData, setResData } = globalStore();
  const [users, setUsers] = useState<IUser[] | null>(null);
  const [userDetails, setUserDetails] = useState<IUserDetails | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isName, setIsName] = useState('');
  const [isDistrict, setIsDistrict] = useState('');
  const [isRegion, setIsRegion] = useState('');

  useEffect(() => {
    userAllList({
      page: currentPage,
      setTotalPage: setTotalPages,
      setData: setUsers,
      setLoading
    });
    getRegions(setRegion);
    getDistrict(setDistrict);
  }, []);

  useEffect(() => {
    userAllList({
      page: currentPage,
      setTotalPage: setTotalPages,
      setData: setUsers,
      setLoading,
      name: isName ? isName : '',
      regionId: isRegion ? isRegion : '',
      districtId: isDistrict ? isDistrict : ''
    });
  }, [currentPage, isName, isRegion, isDistrict]);

  useEffect(() => {
    if (resData) {
      setResData(false);
      userAllList({
        page: currentPage,
        setTotalPage: setTotalPages,
        setData: setUsers,
        setLoading,
        name: isName ? isName : '',
        regionId: isRegion ? isRegion : '',
        districtId: isDistrict ? isDistrict : ''
      });
    }
  }, [resData]);

  const onChange = (page: number): void => setCurrentPage(page - 1);

  const openModal = async (item: any) => {
    setIsModalOpen(true);

    setLoading(true);
    try {
      const { data } = await axios.get(`${user_list}/${item.id}`, config);
      if (data.success) {
        setUserDetails(data.body);
        setLoading(false);
      } else setLoading(false);
    } catch (err) {
      consoleClear();
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUserDetails(null);
  };

  return (
    <>
      <Breadcrumb pageName="Фойдаланувчилар" />

      <div className={`w-full flex justify-between items-center flex-wrap md:flex-nowrap gap-5 mb-5`}>
        <input
          onChange={e => setIsName(e.target.value)}
          placeholder="🔎  Қидирмоқ..."
          type={`search`}
          className="w-full rounded-lg border border-stroke bg-transparent py-3 px-5 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark bg-white dark:text-form-input dark:focus:border-primary"
        />
        <Select
          placeholder={`Вилоятни танлаш`}
          className={`w-full bg-transparent rounded-[10px] h-12`}
          allowClear
          onChange={(value) => setIsRegion(value)}
        >
          {region && region.map(item => (
            <Option value={item.id} key={item.id}>{item.name}</Option>
          ))}
        </Select>
        <Select
          placeholder={`Туманни танланг`}
          className={`w-full bg-transparent rounded-[10px] h-12`}
          allowClear
          onChange={(value) => setIsDistrict(value)}
        >
          {district && district.map(item => (
            <Option value={item.id} key={item.id}>{item.name}</Option>
          ))}
        </Select>
      </div>

      <UniversalTable thead={thead}>
        {loading ? <PendingLoader /> : (users && users.length > 0) ? users.map((user, index) => (
          <tr key={user.id}>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <h5 className="font-medium text-black dark:text-white">{(currentPage * 10) + index + 1}</h5>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <p className="text-black dark:text-white">{user.firstName}</p>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <p className="text-black dark:text-white">{user.lastName}</p>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <p className="text-black dark:text-white">{user.email}</p>
            </td>
            {/* <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className={`text-black dark:text-white`}>
                    <CheckboxIsActive id={user.id} isChecked={user.access} setResData={setResData} />
                  </p>
                </td> */}
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <div className="flex items-center space-x-3.5">
                <button onClick={() => openModal(user)}>
                  <BiShow className="text-2xl duration-300" />
                </button>
              </div>
            </td>
          </tr>
        )) : (
          <tr>
            <td
              colSpan={thead.length}
              className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center"
            >
              Фойдаланувчи мавжуд эмас
            </td>
          </tr>
        )}
      </UniversalTable>
      {totalPages > 0 && (
        <Pagination
          showSizeChanger={false}
          responsive={true}
          defaultCurrent={1}
          total={totalPages}
          onChange={onChange}
          rootClassName={`mt-10 mb-5`}
        />
      )}

      {userDetails ? (
        <GlobalModal onClose={closeModal} isOpen={isModalOpen}>
          <div className="w-54 sm:w-64 md:w-96 lg:w-[40rem]">
            <h2 className="lg:text-4xl  text-center md:text-2xl py-5 font-semibold">Фойдаланувчи малумотлари</h2>
            <div className="flex flex-col gap-3 md:text-xl lg:text-xl">
              <p className="flex justify-between">
                <strong>Тўлиқ исм:</strong>
                <div className="text-blue-400">{userDetails.firstName} {userDetails.lastName}</div>
              </p>
              <p className="flex justify-between">
                <strong>Туғулган куни:</strong>
                <div className="text-blue-400">{userDetails.dateOfBirth && moment(userDetails.dateOfBirth).format('DD.MM.YYYY')}</div>
              </p>
              <p className="flex justify-between">
                <strong>Телефон рақами:</strong>
                <div className="text-blue-400">{userDetails.phoneNumber}</div>
              </p>
              <p className="flex justify-between">
                <strong>Электрон почтаси:</strong>
                <div className="text-blue-400">{userDetails.email}</div>
              </p>
              <p className="flex justify-between">
                <strong>Вилояти:</strong>
                <div className="text-blue-400">{userDetails.regionName}</div>
              </p>
              <p className="flex justify-between">
                <strong>Тумани:</strong>
                <div className="text-blue-400">{userDetails.districtName}</div>
              </p>
              <p className="flex justify-between">
                <strong>Кўчаси:</strong>
                <div className="text-blue-400">{userDetails.street}</div>
              </p>
            </div>
          </div>
        </GlobalModal>
      ) : ((!userDetails && isModalOpen) && <PendingLoader />)}
    </>
  );
};

export default AllUser;
