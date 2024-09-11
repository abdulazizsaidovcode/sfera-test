import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import UniversalTable, { IThead } from '../components/Tables/UniversalTable.tsx';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { result_get_all, result_one_get } from '../common/api/api';
import { config } from '../common/api/token';
import GlobalModal from '../components/modal/modal.tsx';
import { Dropdown, Menu, Pagination, Select, Space } from 'antd';
import type { MenuProps } from 'antd';
import { consoleClear } from '../common/console-clear/console-clear.tsx';
import moment from 'moment';
import PendingLoader from '../common/Loader/pending-loader.tsx';
import { useNavigate } from 'react-router-dom';
import { CiMenuKebab } from 'react-icons/ci';
import AddButtons from '../components/buttons/buttons.tsx';
import { backTestEditDate, statusUpdate } from '../common/logic-functions/user.tsx';
import { getAdminCategory } from '../common/logic-functions/category.tsx';
import categoryStore from '../common/state-management/categoryStore.tsx';
// import toast from 'react-hot-toast';

const { Option } = Select;

interface IUser {
  id: number;
  fullName: string;
  categoryName: string;
  phoneNumber: null | string;
  status: null | string;
  email?: string;
  expiredDate: string;
}

interface IUserDetails {
  id: null | string | number;
  firstName: string;
  lastName: string;
  categoryName: string;
  correctAnswers: number;
  countAnswers: number;
  extraResDtoList: UserDetailsItems[];
  durationTime: number;
  createdAt: string;
  status: null | string;
}

interface UserDetailsItems {
  categoryName: string;
  correctAnswer: number;
  countAnswer: number;
}

const thead: IThead[] = [
  { id: 1, name: 'Т/Р' },
  { id: 2, name: 'Тўлиқ исм' },
  { id: 3, name: 'Категория' },
  { id: 4, name: 'Телефон' },
  { id: 6, name: 'Қайта тест топшириш учун қолган вақт' },
  { id: 5, name: 'Статус' },
  { id: 7, name: 'Ҳаракат' }
];

const User = () => {
  const navigate = useNavigate();
  const { categoryData, setCategoryData } = categoryStore();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [statusEdit, setStatusEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<IUser[] | null>(null);
  const [userDetails, setUserDetails] = useState<IUserDetails | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [status, setStatus] = useState<any>('');
  const [statusVal, setStatusVal] = useState<any>('');
  const [resID, setResID] = useState<number | string>('');
  const [isName, setIsName] = useState('');
  const [statusName, setStatusName] = useState('');
  const [categoryID, setCategoryID] = useState('');
  const [categoryDateID, setCategoryDateID] = useState('');

  useEffect(() => {
    fetchUsers();
    getAdminCategory(setCategoryData);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [currentPage, isName, statusName, categoryID]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const queryParams: string = [
        isName ? `keyword=${isName}` : '',
        categoryID ? `categoryId=${categoryID}` : '',
        statusName ? `status=${statusName}` : ''
      ].filter(Boolean).join('&');

      const url: string = `${result_get_all}?page=${currentPage}&size=10${queryParams ? `&${queryParams}` : ''}`;
      const { data } = await axios.get(url, config);
      if (data.success) {
        setUsers(data.body.body);
        setTotalPages(data.body.totalElements);
        setLoading(false);
      } else setUsers(null);
      consoleClear();
    } catch (error) {
      setLoading(false);
      setUsers(null);
      consoleClear();
    }
  };

  const openModal = async (user: IUser) => {
    setIsModalOpen(true);
    try {
      const { data } = await axios.get(`${result_one_get}${user.id}`, config);
      setUserDetails(data.body);
      consoleClear();
    } catch (error) {
      consoleClear();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUserDetails(null);
  };

  const openStatusEdit = () => setStatusEdit(true);
  const closeModalEdit = () => {
    setStatusEdit(false);
    setStatus('');
    setResID('');
    setStatusVal('');
    setCategoryDateID('');
  };

  const onChange = (page: number): void => setCurrentPage(page - 1);

  const statusNameOrColor = (status: string): any => {
    if (status === 'WAITING') return ['Кутилмоқда', 'bg-yellow-300'];
    else if (status === 'CANCELLED') return ['Бекор қилинди', 'bg-red-500'];
    else if (status === 'APPROVED') return ['Тасдиқланди', 'bg-green-500'];
  };

  const getItems = (user: any): MenuProps['items'] => [
    {
      label: 'Архивни кўриш',
      key: '0',
      onClick: () => navigate(`/archive/${user.id}`)
    },
    {
      label: 'Натижани кўриш',
      key: '1',
      onClick: () => openModal(user)
    },
    {
      label: 'Тасдиқлаш',
      key: '2',
      onClick: () => {
        openStatusEdit();
        setStatus('APPROVED');
        setResID(user.id);
      }
    },
    {
      label: 'Бекор қилиш',
      key: '3',
      onClick: () => {
        openStatusEdit();
        setStatus('CANCELLED');
        setResID(user.id);
      }
    },
    {
      label: 'Қайта топшириш вақтини белгилаш',
      key: '4',
      onClick: () => {
        // if (+calculateDaysDifference(moment(user.expiredDate).format('YYYY-MM-DD')) !== 0) {
        openStatusEdit();
        setStatus('testDateUpdate');
        setResID(user.userId);
        setCategoryDateID(user.categoryId);
        // } else toast.error('Бу фойдаланувчи тест ишлаши мумкин');
      }
    }
  ];

  const calculateDaysDifference = (date: string): number => {
    const today = moment();
    const targetDate = moment(date);

    return targetDate.diff(today, 'day');
  };

  return (
    <>
      <Breadcrumb pageName="Фойдаланувчилар натижаси" />

      <div className={`w-full flex justify-between items-center flex-wrap md:flex-nowrap gap-5 mb-5`}>
        <input
          onChange={e => setIsName(e.target.value)}
          placeholder="🔎  Ф.И.О қидириш..."
          type={`search`}
          className="w-full rounded-lg border border-stroke bg-transparent py-3 px-5 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark bg-white dark:text-form-input dark:focus:border-primary"
        />
        <Select
          placeholder={`Категорияни танланг`}
          className={`w-full bg-transparent rounded-[10px] h-12`}
          allowClear
          onChange={(value) => setCategoryID(value)}
        >
          {categoryData && categoryData.map(item => (
            <Option value={item.id} key={item.id}>{item.name}</Option>
          ))}
        </Select>
        <Select
          placeholder={`Статусни танланг`}
          className={`w-full bg-transparent rounded-[10px] h-12`}
          allowClear
          onChange={(value) => setStatusName(value)}
        >
          <Option value={`APPROVED`}>Тасдиқланган</Option>
          <Option value={`WAITING`}>Кутилмоқда</Option>
          <Option value={`CANCELLED`}>Бекор қилинган</Option>
        </Select>
      </div>

      <UniversalTable thead={thead}>
        {loading ? <PendingLoader /> : (
          users ? users.map((user: IUser | any, index: number) => (
            <tr key={user.id}>
              <td className="border-b border-[#eee] py-5 px-5 dark:border-strokedark">
                <h5 className="font-medium text-black dark:text-white">{(currentPage * 10) + index + 1}</h5>
              </td>
              <td className="border-b border-[#eee] py-5 px-5 dark:border-strokedark">
                <p className="text-black dark:text-white">{user.fullName}</p>
              </td>
              <td className="border-b border-[#eee] py-5 px-5 dark:border-strokedark">
                <p className="text-black dark:text-white">{user.categoryName}</p>
              </td>
              <td className="border-b border-[#eee] py-5 px-5 dark:border-strokedark">
                <p className="text-black dark:text-white">{user.phoneNumber}</p>
              </td>
              <td className="border-b border-[#eee] py-5 px-5 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  {(+calculateDaysDifference(moment(user.expiredDate).format('YYYY-MM-DD')) <= 0)
                    ? 'Тестни ишлаш мумкин'
                    : `${calculateDaysDifference(moment(user.expiredDate).format('YYYY-MM-DD'))} кун қолди`
                  }
                </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-5 dark:border-strokedark">
                <p
                  className={`text-black dark:text-white py-1 rounded-xl text-center ${statusNameOrColor(user.status)[1]}`}>
                  {statusNameOrColor(user.status)[0]}
                </p>
              </td>
              <td className="border-b border-[#eee] py-5 px-5 dark:border-strokedark">
                <div className="flex items-center space-x-3.5 ms-6">
                  <Dropdown overlay={
                    <Menu items={getItems(user)} />
                  } trigger={['click']} arrow>
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        <CiMenuKebab className={`text-2xl duration-300 hover:cursor-pointer`} />
                      </Space>
                    </a>
                  </Dropdown>
                </div>
              </td>
            </tr>
          )) : (<>
            <tr>
              <td
                colSpan={thead.length}
                className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center"
              >
                Фойдаланувчи мавжуд эмас
              </td>
            </tr>
          </>)
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

      {/*status edit modal*/}
      <GlobalModal onClose={closeModalEdit} isOpen={statusEdit}>
        <div className="gap-3 ml-1 min-w-60 sm:min-w-96 lg:min-w-[35rem]">
          {status === 'testDateUpdate' ? <>
            {/*<input*/}
            {/*  type={`number`}*/}
            {/*  value={statusVal}*/}
            {/*  onChange={(e) => setStatusVal(e.target.value)}*/}
            {/*  placeholder="Қайта ишлаш учун вақтни киритинг"*/}
            {/*  className="w-full rounded-lg border border-stroke bg-transparent py-3 px-5 my-4 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"*/}
            {/*/>*/}
            {/*<SelectForm*/}
            {/*  val={categoryDateID}*/}
            {/*  onChange={e => setCategoryDateID(e.target.value)}*/}
            {/*  defOption={`Категорияни танланг`}*/}
            {/*  child={categoryData && (*/}
            {/*    categoryData.map((item: CategoryList | any) => (*/}
            {/*      <option value={item.id} key={item.id}>{item.name}</option>*/}
            {/*    )))}*/}
            {/*/>*/}
            <p className={`text-center text-base lg:text-lg`}>
              Ростдан хам бу фойдаланувчига қайтадан тест топширишга рухсат бермоқчимисиз?
            </p>
          </> : (<>
            <h2 className="text-center md:text-2xl py-5 font-semibold">
              {status === 'APPROVED' ? 'Натижани тасдиқламоқчимисиз' : 'Натижани бекор қилмоқчимисиз'}
            </h2>
            {status === 'APPROVED' && (
              <input
                value={statusVal}
                onChange={e => setStatusVal(e.target.value)}
                placeholder="Амалий баҳони киритинг"
                className="w-full rounded-lg border border-stroke bg-transparent py-3 px-5 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark bg-white dark:text-form-input dark:focus:border-primary"
              />
            )}
          </>)}
          <div className={`flex justify-end items-center mt-5 mb-3 gap-5`}>
            <AddButtons children={`Ёпиш`} onClick={closeModalEdit} />
            {status === 'testDateUpdate' ? (
              <AddButtons
                children={`Ха`}
                // disabled={!(statusVal && categoryDateID)}
                onClick={() => backTestEditDate({
                  userId: resID,
                  // expiredDate: statusVal,
                  categoryId: categoryDateID,
                  closeModal: closeModalEdit,
                  fetchData: fetchUsers
                })}
              />
            ) : (
              <AddButtons
                children={`Сақлаш`}
                disabled={status === 'APPROVED' ? !statusVal : false}
                onClick={() => statusUpdate({
                  status,
                  ball: status === 'APPROVED' ? statusVal : '',
                  resultID: resID,
                  getUser: fetchUsers,
                  close: closeModalEdit
                })}
              />
            )}
          </div>
        </div>
      </GlobalModal>

      {/*result full modal*/}
      {userDetails ? (
        <GlobalModal onClose={closeModal} isOpen={isModalOpen}>
          <div className="gap-3 ml-1 min-w-60 sm:min-w-96 lg:min-w-[35rem]">
            <h2 className="lg:text-3xl  text-center md:text-2xl py-5 font-semibold">Фойдаланувчи натижалари</h2>
            <div className="flex flex-col gap-3 md:text-xl lg:text-xl">
              <p className="flex justify-between">
                <strong>Тўлиқ исм:</strong>
                <div className="text-blue-400">{userDetails.firstName} {userDetails.lastName}</div>
              </p>
              <p className="flex justify-between">
                <strong>Категория:</strong>
                <div className="text-blue-400">{userDetails.categoryName}</div>
              </p>
              <p className="flex justify-between">
                <strong>Натижа (жавоблар / саволлар):</strong>
                <div className="text-blue-400"><span
                  className={`text-green-500`}>{userDetails.correctAnswers}</span> / {userDetails.countAnswers}</div>
              </p>
              <p className="flex justify-between">
                <strong>Ишлаш давомийлиги:</strong>
                <div className="text-blue-400">{userDetails.durationTime} (мин)</div>
              </p>
              <p className="flex justify-between">
                <strong>Ишлаган санаси:</strong>
                <div className="text-blue-400">{moment(userDetails.createdAt.slice(0, 10)).format('DD/MM/YYYY')}</div>
              </p>
            </div>
            {userDetails && userDetails.extraResDtoList.length > 0 && (
              <div className={`border-t my-5`}>
                <h2 className="lg:text-2xl md:text-xl font-semibold mt-3 mb-2 text-center">
                  Қўшимча Категориялардан ишланганлар
                </h2>
                {userDetails && userDetails.extraResDtoList.map((item: any, index: number) => (
                  <div className={`flex justify-between items-center gap-5 mb-2`} key={index}>
                    <p className={`text-base`}>{item.categoryName}</p>
                    <p className={`font-bold`}>
                      <span className={`text-green-400`}>{item.correctAnswer}</span> / {item.countAnswer}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </GlobalModal>
      ) : ((isModalOpen && !userDetails) && <PendingLoader />)}
    </>
  );
};

export default User;
