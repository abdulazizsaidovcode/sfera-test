import { useEffect } from 'react';
import useAddressStore from '../common/state-management/address';
import {
  addDistrict,
  addRegion,
  deleteDistrict,
  deleteRegion,
  getDistrics,
  getRegions,
  updateDistrict,
  updateRegion
} from '../common/logic-functions/address';
import globalStore from '../common/state-management/globalStore';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import PendingLoader from '../common/Loader/pending-loader';
import UniversalTable, { IThead } from '../components/Tables/UniversalTable';
import { MdDelete, MdEdit, MdOutlineAddCircle } from 'react-icons/md';
import AddButtons from '../components/buttons/buttons';
import GlobalModal from '../components/modal/modal';
import SelectForm from '../components/select/Select';
import { unReload } from '../common/privacy-features/privacy-features.tsx';

const regionsThead: IThead[] = [
  { id: 1, name: 'Т/Р' },
  { id: 3, name: 'Вилоят номи' },
  { id: 4, name: 'Ҳаракат' }
];

const districstsThead: IThead[] = [
  { id: 1, name: 'Т/Р' },
  { id: 3, name: 'Туман номи' },
  { id: 3, name: 'Вилоят номи' },
  { id: 4, name: 'Ҳаракат' }
];

const styles = {
  input: 'w-full rounded-lg border border-stroke bg-transparent py-2 px-5 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
};

const Address = () => {
  const {
    regions,
    setRegions,
    districs,
    setDistrics,
    isDistrictModal,
    setIsDistrictModal,
    isRegionModal,
    setIsRegionModal,
    isDeleteRegionModal,
    setIsDeleteRegionModal,
    name,
    setName,
    id,
    setId,
    isEditRegionModal,
    setIsEditRegionModal,
    isEditDistrictModal,
    setIsEditDistrictModal,
    isDeleteDistricModal,
    setIsDeleteDistricModal,
    regionId,
    setRegionId
  } = useAddressStore();
  const { isLoading, setIsLoading } = globalStore();

  useEffect(() => {
    unReload();
  }, []);

  useEffect(() => {
    getRegions(setRegions, setIsLoading);
  }, [setRegions]);

  useEffect(() => {
    getDistrics(setDistrics, setIsLoading);
  }, [setDistrics]);

  const toggleRegionModal = () => {
    setIsRegionModal(!isRegionModal);
    setName('');
    setId(0);
  };

  const toggleDeleteRegionModal = () => {
    setIsDeleteRegionModal(!isDeleteRegionModal);
    setName('');
    setId(0);
  };

  const toggleEditRegionModal = () => {
    setName('');
    setId(0);
    setIsEditRegionModal(!isEditRegionModal);
  };

  const toggleDistrictModal = () => {
    setIsDistrictModal(!isDistrictModal);
    setName('');
    setId(0);
  };

  const toggleDeleteDistricModal = () => {
    setIsDeleteDistricModal(!isDeleteDistricModal);
    setName('');
    setId(0);
  };

  const toggleEditDistricModal = () => {
    setName('');
    setId(0);
    setIsEditDistrictModal(!isEditDistrictModal);
  };

  return (
    <>
      <div>
        <Breadcrumb pageName="Манзиллар" />
        {isLoading && <PendingLoader />}
        <div>
          <div className="flex justify-between items-center">
            <div><p className="text-black text-2xl dark:text-white">Вилоятлар</p></div>
            <div className={`my-5`}>
              <AddButtons
                onClick={toggleRegionModal}
                children={<div className={`flex justify-center items-center`}>
                  <MdOutlineAddCircle className={`text-4xl mr-3`} />
                  <p className={`text-lg font-bold`}>Қўшиш</p>
                </div>}
              />
            </div>
          </div>
          <UniversalTable thead={regionsThead}>
            {regions.length !== 0 ? regions.map((item, index) => (
              <tr key={index}>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <h5 className="font-medium text-black dark:text-white">{index + 1}</h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.name}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-yellow-500">
                      <MdEdit
                        className={`text-2xl duration-300`}
                        onClick={() => {
                          toggleEditRegionModal();
                          setId(item.id);
                          setName(item.name);
                        }}
                      />
                    </button>
                    <button className="hover:text-red-600">
                      <MdDelete
                        className={`text-2xl duration-300`}
                        onClick={() => {
                          toggleDeleteRegionModal();
                          setId(item.id);
                        }}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            )) : (<>
              <tr>
                <td
                  colSpan={districstsThead.length}
                  className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center"
                >
                  Вилоятлар мавжуд эмас
                </td>
              </tr>
            </>)}
          </UniversalTable>
        </div>
        <div>
          <div className="flex justify-between items-center">
            <div><p className="text-black text-2xl dark:text-white">Туманлар</p></div>
            <div className={`my-5`}>
              <AddButtons
                onClick={toggleDistrictModal}
                children={<div className={`flex justify-center items-center`}>
                  <MdOutlineAddCircle className={`text-4xl mr-3`} />
                  <p className={`text-lg font-bold`}>Қўшиш</p>
                </div>}
              />
            </div>
          </div>
          <UniversalTable thead={districstsThead}>
            {districs.length !== 0 ? districs.map((item, index) => (
              <tr key={index}>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <h5 className="font-medium text-black dark:text-white">{index + 1}</h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.name}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.regionName}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-yellow-500">
                      <MdEdit
                        className={`text-2xl duration-300`}
                        onClick={() => {
                          toggleEditDistricModal();
                          setId(item.id);
                          setRegionId(item.regionId);
                          setName(item.name);
                        }}
                      />
                    </button>
                    <button className="hover:text-red-600">
                      <MdDelete
                        className={`text-2xl duration-300`}
                        onClick={() => {
                          toggleDeleteDistricModal();
                          setId(item.id);
                        }}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            )) : (<>
              <tr>
                <td
                  colSpan={districstsThead.length}
                  className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center"
                >
                  Туманлар мавжуд эмас
                </td>
              </tr>
            </>)}
          </UniversalTable>
        </div>
        <GlobalModal isOpen={isRegionModal} onClose={toggleRegionModal}>
          <div className="gap-3 ml-1 min-w-60 sm:min-w-96 lg:min-w-[35rem]">
            <p className="text-black dark:text-white text-2xl text-center my-3">Вилоят қўшиш</p>
            <div className="mb-4">
              <input
                required
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
                id="lastname"
                placeholder="Вилоят номини киритинг"
              />
            </div>
            <div className={`flex justify-end items-center gap-5`}>
              <AddButtons children={`Ёпиш`} onClick={toggleRegionModal} />
              <AddButtons
                children={isLoading ? 'юкланмоқда...' : `Сақлаш`}
                onClick={() => addRegion(setRegions, setIsLoading, name, toggleRegionModal)}
                disabled={isLoading}
                type={`submit`}
              />
            </div>
          </div>
        </GlobalModal>
        <GlobalModal isOpen={isEditRegionModal} onClose={toggleEditRegionModal}>
          <div className="gap-3 ml-1 min-w-60 sm:min-w-96 lg:min-w-[35rem]">
            <p className="text-black dark:text-white text-2xl text-center my-3">Вилоят номини ўзгартириш</p>
            <div className="mb-4">
              <input
                required
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
                id="lastname"
                value={name}
                placeholder="Вилоят номини киритинг"
              />
            </div>
            <div className={`flex justify-end items-center gap-5`}>
              <AddButtons children={`Ёпиш`} onClick={toggleEditRegionModal} />
              <AddButtons
                children={isLoading ? 'юкланмоқда...' : `Сақлаш`}
                onClick={() => updateRegion(id, name, setRegions, setDistrics, setIsLoading, toggleEditRegionModal)}
                disabled={isLoading}
                type={`submit`}
              />
            </div>
          </div>
        </GlobalModal>
        <GlobalModal onClose={toggleDeleteRegionModal} isOpen={isDeleteRegionModal}>
          <div className={`w-54 sm:w-64 md:w-96 lg:w-[40rem]`}>
            <p className="text-black dark:text-white text-xl text-center my-3">Сиз аниқ бу вилоятни ўчирмоқчимисиз</p>
            <div className={`flex justify-end items-center gap-5 mt-5`}>
              <AddButtons children={`Ёпиш`} onClick={toggleDeleteRegionModal} />
              <AddButtons
                children={isLoading ? 'юкланмоқда...' : `Учириш`}
                disabled={isLoading}
                onClick={() => deleteRegion(id, setRegions, setDistrics, setIsLoading, toggleDeleteRegionModal)}
              />
            </div>
          </div>
        </GlobalModal>
        <GlobalModal isOpen={isDistrictModal} onClose={toggleDistrictModal}>
          <div className="gap-3 ml-1 min-w-60 sm:min-w-96 lg:min-w-[35rem]">
            <p className="text-black dark:text-white text-2xl text-center my-3">Туман қўшиш</p>
            <div className="mb-4">
              <div className="mb-3">
                <SelectForm
                  onChange={e => setId(e.target.value)}
                  defOption={`Вилоятни танланг`}
                  child={<>
                    {regions.map((item, index) => (
                      <option key={index} value={item.id}>{item.name}</option>
                    ))}
                  </>}
                />
              </div>
              <input
                required
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
                id="lastname"
                placeholder="Туман номини киритинг"
              />
            </div>
            <div className={`flex justify-end items-center gap-5`}>
              <AddButtons children={`Ёпиш`} onClick={toggleRegionModal} />
              <AddButtons
                children={isLoading ? 'юкланмоқда...' : `Сақлаш`}
                onClick={() => addDistrict(name, id, setDistrics, setIsLoading, toggleDistrictModal)}
                disabled={isLoading}
                type={`submit`}
              />
            </div>
          </div>
        </GlobalModal>
        <GlobalModal onClose={toggleDeleteDistricModal} isOpen={isDeleteDistricModal}>
          <div className={`w-54 sm:w-64 md:w-96 lg:w-[40rem]`}>
            <p className="text-black dark:text-white text-xl text-center my-3">Сиз аниқ бу туманни ўчирмоқчимисиз</p>
            <div className={`flex justify-end items-center gap-5 mt-5`}>
              <AddButtons children={`Ёпиш`} onClick={toggleDeleteDistricModal} />
              <AddButtons
                children={isLoading ? 'юкланмоқда...' : `Учириш`}
                disabled={isLoading}
                onClick={() => deleteDistrict(id, setDistrics, setIsLoading, toggleDeleteDistricModal)}
              />
            </div>
          </div>
        </GlobalModal>
        <GlobalModal isOpen={isEditDistrictModal} onClose={toggleEditDistricModal}>
          <div className="gap-3 ml-1 min-w-60 sm:min-w-96 lg:min-w-[35rem]">
            <p className="text-black dark:text-white text-2xl text-center my-3">Туман номини ўзгартириш</p>
            <div className="mb-4">
              <div className="mb-3">
                <SelectForm
                  onChange={e => setRegionId(e.target.value)}
                  defOption={`Вилоятни танланг`}
                  val={regionId}
                  child={<>
                    {regions.map((item, index) => (
                      <option key={index} value={item.id}>{item.name}</option>
                    ))}
                  </>}
                />
              </div>
              <input
                required
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
                id="lastname"
                value={name}
                placeholder="Туман номини киритинг"
              />
            </div>
            <div className={`flex justify-end items-center gap-5`}>
              <AddButtons children={`Ёпиш`} onClick={toggleEditDistricModal} />
              <AddButtons
                children={isLoading ? 'юкланмоқда...' : `Сақлаш`}
                onClick={() => updateDistrict(id, name, regionId, setDistrics, setIsLoading, toggleEditDistricModal)}
                disabled={isLoading}
                type={`submit`}
              />
            </div>
          </div>
        </GlobalModal>
      </div>
    </>
  );
};

export default Address;