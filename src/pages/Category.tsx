import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import UniversalTable, { IThead } from '../components/Tables/UniversalTable.tsx';
import { MdDelete, MdEdit, MdOutlineAddCircle } from 'react-icons/md';
import AddButtons from '../components/buttons/buttons.tsx';
import GlobalModal from '../components/modal/modal.tsx';
import { useEffect, useState } from 'react';
import {
  addCategory,
  deleteCategory,
  getAdminCategoryPage
} from '../common/logic-functions/category.tsx';
import categoryStore from '../common/state-management/categoryStore.tsx';
import globalStore from '../common/state-management/globalStore.tsx';
import SelectForm from '../components/select/Select.tsx';
import { api_videos_files } from '../common/api/api.tsx';
import image from '../images/default.png';
import ImageUpload from '../components/img-upload.tsx';
import { Pagination, Popover } from 'antd';
import PendingLoader from '../common/Loader/pending-loader.tsx';
import toast from 'react-hot-toast';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { CategoryList } from '../types/category.ts';
import { unReload } from '../common/privacy-features/privacy-features.tsx';
import ImageModal from '../components/modal/image-modal.tsx';

const thead: IThead[] = [
  { id: 1, name: 'Т/Р' },
  { id: 2, name: 'Категория расми' },
  { id: 3, name: 'Категория номи' },
  { id: 4, name: 'Тавсифи' },
  { id: 5, name: 'Саволлар сони' },
  // { id: 6, name: 'Қийин саволлар сони' },
  // { id: 7, name: 'Урта саволлар сони' },
  // { id: 8, name: 'Осон саволлар сони' },
  { id: 9, name: 'Қўшимча саволлар сони' },
  { id: 10, name: 'Давомийлик вақти (м)' },
  { id: 11, name: 'Қайта қабул қилиш санаси' },
  { id: 12, name: 'Яратган' },
  { id: 13, name: 'Категория ҳолати' },
  { id: 14, name: 'Ўчирган' },
  { id: 15, name: 'Ҳаракат' }
];

const defVal = {
  name: '',
  description: '',
  questionCount: '',
  extraQuestionCount: '',
  durationTime: '',
  retakeDate: '',
  // easyQuestionCount: '',
  // mediumQuestionCount: '',
  // hardQuestionCount: '',
  main: '',
  fileId: ''
};

const Category = () => {
  const { categoryData, setCategoryData, setAddValue, addValue } = categoryStore();
  const { isLoading, setIsLoading, resData, setResData, imgUpload, setImgUpload } = globalStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [editStatus, setEditStatus] = useState<string | number>('');
  const [page, setPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [imageId, setImageId] = useState('');
  const [imageModal, setImageModal] = useState(false);

  useEffect(() => {
    getAdminCategoryPage({ setData: setCategoryData, page, setTotalPage, setIsLoading });
    unReload();
  }, []);

  useEffect(() => {
    getAdminCategoryPage({ setData: setCategoryData, page, setTotalPage, setIsLoading });
  }, [page]);

  useEffect(() => {
    if (addValue && imgUpload) addValue.fileId = imgUpload;
  }, [imgUpload]);

  useEffect(() => {
    if (resData) {
      setResData(false);
      getAdminCategoryPage({ setData: setCategoryData, page, setTotalPage, setIsLoading });
      setAddValue(defVal);
      closeModal();
      closeModalDelete();
      setEditStatus('');
      setImgUpload(null);
    }
  }, [resData]);

  const openModal = () => setIsModalOpen(true);
  const openModalDelete = () => setIsModalDelete(true);
  const openImageModal = () => setImageModal(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setEditStatus('');
    setAddValue(defVal);
  };
  const closeModalDelete = () => {
    setIsModalDelete(false);
    setEditStatus('');
  };
  const closeImageModal = () => {
    setImageModal(false);
    setImageId('');
  };

  const handleInputChange = (name: string, value: string | boolean) => {
    if (addValue?.main === 'true') {
      addValue.retakeDate = 0;
      addValue.durationTime = 0;
      addValue.extraQuestionCount = 0;
      addValue.questionCount = 0;
      // addValue.easyQuestionCount = 0;
      // addValue.mediumQuestionCount = 0;
      // addValue.hardQuestionCount = 0;
    }
    // if (addValue && imgUpload) addValue.fileId = imgUpload;

    setAddValue({
      ...addValue,
      [name]: value
    });
  };

  const styles = {
    input: 'w-full rounded-lg border border-stroke bg-transparent py-2 px-5 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
  };

  return (
    <>
      <Breadcrumb pageName="Категория" />

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
        {isLoading ? <>
          <PendingLoader />
          <tr><td colSpan={thead.length} className="border-b border-[#eee] p-5 dark:border-strokedark text-center">Категория юкланмоқда...</td></tr>
        </> : (
          categoryData ? (
            categoryData.map((item: CategoryList | any, i) => (
              <tr key={i}>
                <td className="border-b border-[#eee] p-5 dark:border-strokedark">
                  <h5 className="font-medium text-black dark:text-white">
                    {(page * 10) + i + 1}
                  </h5>
                </td>
                <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                  {/*<img*/}
                  {/*  src={item.fileId ? `${api_videos_files}${item.fileId}` : image}*/}
                  {/*  alt={item.name}*/}
                  {/*  className={`w-14 h-14 rounded-full object-cover hover:cursor-pointer scale-125`}*/}
                  {/*/>*/}
                  <LazyLoadImage
                    alt={item.name}
                    src={item.fileId ? `${api_videos_files}${item.fileId}` : image}
                    className={'w-10 h-10 scale-[1.4] rounded-full object-cover hover:cursor-pointer'}
                    effect="blur"
                    onClick={() => {
                      if (item.fileId) {
                        openImageModal();
                        setImageId(item.fileId);
                      } else {
                        openImageModal();
                        setImageId('');
                      }
                    }}
                  />
                </td>
                <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.name}
                  </p>
                </td>
                <td className="border-b border-[#eee] p-5 dark:border-strokedark min-w-[300px]">
                  <p className="text-black dark:text-white">
                    {item.description.length > 100 ? <>
                      <Popover
                        title={item.description}
                        overlayStyle={{ width: '50%' }}
                      >
                        {`${item.description.slice(0, 100)}...`}
                      </Popover>
                    </> : item.description}
                  </p>
                </td>
                <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.questionCount}
                  </p>
                </td>
                {/*<td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">*/}
                {/*  <p className="text-black dark:text-white">*/}
                {/*    {item.hardQuestionCount}*/}
                {/*  </p>*/}
                {/*</td>*/}
                {/*<td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">*/}
                {/*  <p className="text-black dark:text-white">*/}
                {/*    {item.mediumQuestionCount}*/}
                {/*  </p>*/}
                {/*</td>*/}
                {/*<td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">*/}
                {/*  <p className="text-black dark:text-white">*/}
                {/*    {item.easyQuestionCount}*/}
                {/*  </p>*/}
                {/*</td>*/}
                <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.extraQuestionCount}
                  </p>
                </td>
                <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.durationTime}
                  </p>
                </td>
                <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.retakeDate}
                  </p>
                </td>
                <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.createdBy}
                  </p>
                </td>
                <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.deleted && 'Учирилган'}
                  </p>
                </td>
                <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.deletedBy}
                  </p>
                </td>
                <td className="border-b border-[#eee] min-w-[200px] p-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-yellow-500">
                      <MdEdit
                        className={`text-2xl duration-300`}
                        onClick={() => {
                          if (!item.deleted) {
                            openModal();
                            setAddValue(item);
                            setEditStatus('edit');
                          } else toast.error('Бу категория учирилган, буни холатини узгартира олмайсиз');
                        }}
                      />
                    </button>
                    <button className="hover:text-red-600">
                      <MdDelete
                        className={`text-2xl duration-300`}
                        onClick={() => {
                          if (!item.deleted) {
                            openModalDelete();
                            item.id && setEditStatus(item.id);
                          } else toast.error('Бу категория учирилган, буни холатини узгартира олмайсиз');
                        }}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={thead.length} className="border-b border-[#eee] p-5 dark:border-strokedark text-center">
                Категория топилмади
              </td>
            </tr>
          ))}
      </UniversalTable>
      {totalPage > 0 && (
        <Pagination
          showSizeChanger={false}
          responsive={true}
          defaultCurrent={1}
          total={totalPage}
          onChange={(p) => setPage(p - 1)}
          rootClassName={`mt-10 mb-5`}
        />
      )}

      {/* modal*/}
      <GlobalModal onClose={closeModal} isOpen={isModalOpen}>
        <div className={`w-54 sm:w-64 md:w-96 lg:w-[40rem]`}>
          <form className={`mt-5`} onSubmit={(e) => {
            editStatus ? addCategory(e, addValue, setResData, setIsLoading, editStatus)
              : addCategory(e, addValue, setResData, setIsLoading);
          }}>
            <div className={`mb-4 mt-10`}>
              <div className={`flex items-center justify-center mb-5`}>
                <ImageUpload />
              </div>
              <SelectForm
                val={addValue?.main}
                onChange={e => handleInputChange('main', e.target.value)}
                defOption={`Категория турини танланг`}
                child={<>
                  <option value="true">Асосий категория</option>
                  <option value="false">Асосий бўлмаган категория</option>
                </>}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="categoryName">Категория номи</label>
              <input
                required
                value={addValue?.name}
                onChange={e => handleInputChange('name', e.target.value)}
                className={styles.input}
                id="categoryName"
                placeholder="Категория номини киритинг"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="description">Тавсифи</label>
              <input
                required
                value={addValue?.description}
                onChange={e => handleInputChange('description', e.target.value)}
                className={styles.input}
                id="description"
                placeholder="Тавсифни киритинг"
              />
            </div>
            {addValue?.main !== 'true' && (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Умумий саволлар сони</label>
                  <input
                    required
                    value={addValue?.questionCount}
                    onChange={e => handleInputChange('questionCount', e.target.value)}
                    className={styles.input}
                    type={`number`}
                    placeholder="Умумий саволлар сонини киритинг"
                  />
                </div>
                {/*<div className="mb-4">*/}
                {/*  <label className="block text-gray-700 mb-2">Осон саволлар сони</label>*/}
                {/*  <input*/}
                {/*    required*/}
                {/*    value={addValue?.easyQuestionCount}*/}
                {/*    onChange={e => handleInputChange('easyQuestionCount', e.target.value)}*/}
                {/*    className={styles.input}*/}
                {/*    type={`number`}*/}
                {/*    placeholder="Осон саволлар сонини киритинг"*/}
                {/*  />*/}
                {/*</div>*/}
                {/*<div className="mb-4">*/}
                {/*  <label className="block text-gray-700 mb-2">Урта саволлар сони</label>*/}
                {/*  <input*/}
                {/*    required*/}
                {/*    value={addValue?.mediumQuestionCount}*/}
                {/*    onChange={e => handleInputChange('mediumQuestionCount', e.target.value)}*/}
                {/*    className={styles.input}*/}
                {/*    type={`number`}*/}
                {/*    placeholder="Урта саволлар сонини киритинг"*/}
                {/*  />*/}
                {/*</div>*/}
                {/*<div className="mb-4">*/}
                {/*  <label className="block text-gray-700 mb-2">Қийин саволлар сони</label>*/}
                {/*  <input*/}
                {/*    required*/}
                {/*    value={addValue?.hardQuestionCount}*/}
                {/*    onChange={e => handleInputChange('hardQuestionCount', e.target.value)}*/}
                {/*    className={styles.input}*/}
                {/*    type={`number`}*/}
                {/*    placeholder="Қийин саволлар сонини киритинг"*/}
                {/*  />*/}
                {/*</div>*/}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="extraQuestionCount">Қўшимча саволлар сони</label>
                  <input
                    required
                    value={addValue?.extraQuestionCount}
                    onChange={e => handleInputChange('extraQuestionCount', e.target.value)}
                    className={styles.input}
                    type="number"
                    id="extraQuestionCount"
                    placeholder="Қўшимча саволлар сонини киритинг"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="durationTime">Давомийлик вақти (м)</label>
                  <input
                    required
                    value={addValue?.durationTime}
                    onChange={e => handleInputChange('durationTime', e.target.value)}
                    className={styles.input}
                    type="number"
                    id="durationTime"
                    placeholder="Давомийлик вақтини киритинг"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="retakeDate">Қайта қабул қилиш санаси</label>
                  <input
                    required
                    value={addValue?.retakeDate}
                    onChange={e => handleInputChange('retakeDate', e.target.value)}
                    className={styles.input}
                    type="number"
                    id="retakeDate"
                    placeholder="Қайта қабул қилиш санасини киритинг"
                  />
                </div>
              </>
            )}

            <div className={`flex justify-end items-center gap-5`}>
              <AddButtons children={`Ёпиш`} onClick={closeModal} />
              <AddButtons
                children={isLoading ? 'юкланмоқда...' : `Сақлаш`}
                disabled={isLoading}
                type={`submit`}
              />
              {/*|| !addValue?.fileId  => img isRequired*/}
            </div>
          </form>
        </div>
      </GlobalModal>

      {/*delete modal*/}
      <GlobalModal onClose={closeModalDelete} isOpen={isModalDelete}>
        <div className={`w-54 sm:w-64 md:w-96 lg:w-[40rem]`}>
          <p className={`my-7 text-center font-semibold`}>Категорияни ўчириб ташламоқчимисиз?</p>
          <div className={`flex justify-end items-center gap-5 mt-5`}>
            <AddButtons children={`Ёпиш`} onClick={closeModalDelete} />
            <AddButtons
              children={isLoading ? 'юкланмоқда...' : `Учириш`}
              disabled={isLoading}
              onClick={() => deleteCategory(editStatus, setIsLoading, setResData)}
            />
          </div>
        </div>
      </GlobalModal>

      {/*img modal*/}
      <ImageModal isOpen={imageModal} onClose={() => closeImageModal()} imgID={imageId} />
    </>
  );
};

export default Category;
