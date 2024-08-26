import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import UniversalTable, { IThead } from '../components/Tables/UniversalTable.tsx';
import { useEffect, useState } from 'react';
import GlobalModal from '../components/modal/modal.tsx';
import AddButtons from '../components/buttons/buttons.tsx';
import { MdOutlineAddCircle } from 'react-icons/md';
import globalStore from '../common/state-management/globalStore.tsx';
import adminStore from '../common/state-management/adminStore.tsx';
import { getAdminLists, postAdmin } from '../common/logic-functions/admin.tsx';
import SwitcherIsActive from '../components/Switchers/SwitcherIsActive.tsx';
import SelectForm from '../components/select/Select.tsx';
import { Pagination } from 'antd';
import PendingLoader from '../common/Loader/pending-loader.tsx';
import { unReload } from '../common/privacy-features/privacy-features.tsx';

const thead: IThead[] = [
  { id: 1, name: 'Т/р' },
  { id: 2, name: 'Исм' },
  { id: 3, name: 'Фамилия' },
  { id: 4, name: 'Электрон почта' },
  { id: 4, name: 'Активлиги' }
];

const defData = {
  firstname: '',
  lastname: '',
  email: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
  role: ''
};

const UserAdmin = () => {
  const { isLoading, setIsLoading, resData, setResData } = globalStore();
  const { addData, setAddData, getAdminList, setGetAdminList, page, totalPage, setPage, setTotalPage } = adminStore();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    getAdminLists(setGetAdminList, setIsLoading, page, setTotalPage);
    unReload();
  }, []);

  useEffect(() => {
    getAdminLists(setGetAdminList, setIsLoading, page, setTotalPage);
  }, [page]);

  useEffect(() => {
    if (resData) {
      getAdminLists(setGetAdminList, setIsLoading, page, setTotalPage);
      setResData(false);
      closeModal();
    }
  }, [resData]);

  const handleInputChange = (name: string, value: string | boolean) => {
    setAddData({
      ...addData,
      [name]: value
    });
  };

  const openModal = async () => setIsModalOpen(true);
  const closeModal = () => {
    setAddData(defData);
    setIsModalOpen(false);
  };

  const styles = {
    input: 'w-full rounded-lg border border-stroke bg-transparent py-2 px-5 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
  };

  const onChange = (page: number): void => setPage(page - 1);
  return (
    <>
      <Breadcrumb pageName="Ходимлар" />

      <div className={`mb-5`}>
        <AddButtons
          onClick={openModal}
          children={<div className={`flex justify-center items-center`}>
            <MdOutlineAddCircle className={`text-4xl mr-3`} />
            <p className={`text-lg font-bold`}>Қўшиш</p>
          </div>}
        />
      </div>

      <UniversalTable thead={thead}>
        {isLoading ? <PendingLoader /> : (getAdminList && getAdminList.length > 0) ? getAdminList.map((item, index) => (
          <tr>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <h5 className="font-medium text-black dark:text-white">{index + 1}</h5>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <p className="text-black dark:text-white">{item.firstName}</p>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <p className="text-black dark:text-white">{item.lastName}</p>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <p className="text-black dark:text-white">{item.email}</p>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <p className="text-black dark:text-white">
                <SwitcherIsActive id={item.id} active={item.enabled} />
              </p>
            </td>
          </tr>
        )) : (
          <tr>
            <td
              colSpan={thead.length}
              className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center"
            >
              Ходимлар мавжуд эмас
            </td>
          </tr>
        )}
      </UniversalTable>
      {totalPage > 0 && (
        <Pagination
          showSizeChanger={false}
          responsive={true}
          defaultCurrent={1}
          total={totalPage}
          onChange={onChange}
          rootClassName={`mt-10 mb-5`}
        />
      )}

      {/*modal*/}
      <GlobalModal onClose={closeModal} isOpen={isModalOpen}>
        <div className="gap-3 ml-1 min-w-60 sm:min-w-96 lg:min-w-[35rem]">
          <form className={`mt-5`} onSubmit={(e) => postAdmin(e, addData, setIsLoading, setResData)}>
            <SelectForm
              val={addData.role}
              onChange={e => handleInputChange('role', e.target.value)}
              defOption={`Админ тоифасини танланг`}
              child={<>
                <option value="ROLE_TESTER">Тестер админ</option>
                <option value="ROLE_ADMIN">Текширувчи админ</option>
              </>}
            />
            <div className="my-4">
              <label className="block text-gray-700 mb-2" htmlFor="firstName">Исм</label>
              <input
                required
                value={addData.firstname}
                onChange={e => handleInputChange('firstname', e.target.value)}
                className={styles.input}
                id="firstName"
                placeholder="Исмни киритинг"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="lastname">Фамилия</label>
              <input
                required
                value={addData.lastname}
                onChange={e => handleInputChange('lastname', e.target.value)}
                className={styles.input}
                id="lastname"
                placeholder="Фамилияни киритинг"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="phoneNumber">Телефон рақам</label>
              <input
                required
                value={addData.phoneNumber}
                onChange={e => handleInputChange('phoneNumber', e.target.value)}
                className={styles.input}
                id="phoneNumber"
                placeholder="Телефон рақамни киритинг"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">Электрон почта</label>
              <input
                required
                value={addData.email}
                onChange={e => handleInputChange('email', e.target.value)}
                className={styles.input}
                type={`email`}
                id="email"
                placeholder="Электрон почтани киритинг"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="password">Парол</label>
              <input
                required
                value={addData.password}
                onChange={e => handleInputChange('password', e.target.value)}
                className={styles.input}
                id="password"
                placeholder="Паролни киритинг"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">Паролни такрорланг</label>
              <input
                required
                value={addData.confirmPassword}
                onChange={e => handleInputChange('confirmPassword', e.target.value)}
                className={styles.input}
                id="confirmPassword"
                placeholder="Такрорий паролни киритинг"
              />
            </div>

            <div className={`flex justify-end items-center gap-5`}>
              <AddButtons children={`Ёпиш`} onClick={closeModal} />
              <AddButtons
                children={isLoading ? 'юкланмоқда...' : `Сақлаш`}
                disabled={isLoading}
                type={`submit`}
              />
            </div>
          </form>
        </div>
      </GlobalModal>
    </>
  );
};

export default UserAdmin;
