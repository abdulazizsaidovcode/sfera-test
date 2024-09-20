import React, { useEffect, useState } from 'react';
import CategoryCard from '../../components/CategoryCard';
import categoryStore from '../../common/state-management/categoryStore';
import { getClientCategory } from '../../common/logic-functions/category';
import { Skeleton } from 'antd';
import { MdOutlineNotStarted } from 'react-icons/md';
import GlobalModal from '../../components/modal/modal';
import AddButtons from '../../components/buttons/buttons';
import { useNavigate } from 'react-router-dom';
import CustomSkeleton from '@/components/skeleton/custom-skeleton';

const ClientQuizStart: React.FC = () => {
  const navigation = useNavigate();
  const { clientCategoryData, setClientCategoryData } = categoryStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<any>('');

  useEffect(() => {
    getClientCategory(setClientCategoryData, setIsLoading);
  }, [setClientCategoryData]);

  const toggleModal = () => setIsModal(!isModal);

  return (
    <>
      <div>
        <div>
          <p className="text-center text-[#16423C] text-3xl font-bold">Yo'nalishlar</p>
          {/* <p className="text-black dark:text-white text-xl font-bold">Ҳуш келибсиз, {getMee && getMee.fullName}</p> */}
        </div>
        {isLoading ? <div className='mt-10 grid grid-cols-2 gap-5'>{[...Array(6)].map((_, index) => <CustomSkeleton key={index} />)}</div> :
          clientCategoryData && clientCategoryData.length !== 0 ?
            <div className='grid grid-cols-2 gap-3 mt-5'>
              {clientCategoryData && clientCategoryData.map((item) => (
                <div>
                  <CategoryCard
                    data={item}
                    onClick={() => {
                      toggleModal();
                      setCategoryId(item);
                    }}
                  />
                </div>
              ))}
            </div> : <div className="flex h-[69vh] justify-center items-center">
              <p className="text-xl">Yo'nalishlar mavjud emas</p>
            </div>
        }
        <GlobalModal isOpen={isModal} onClose={toggleModal}>
          <div className="w-54 sm:w-64 md:w-96 lg:w-[40rem]">
            <div className="flex flex-col justify-center items-center">
              <MdOutlineNotStarted className="text-[#16423C]" size={100} />
              <p className="text-center sm:text-[17px]">Xaqiqatdan ham <span className={`font-bold text-[#16423C]`}>{categoryId.name}</span> yo'nalish boyicha test ishlamoqchisizmi?</p>
              <div className="flex gap-3 mt-4">
                <AddButtons onClick={toggleModal}>Orqaga</AddButtons>
                <AddButtons onClick={() => {
                  navigation(`/client/quiz/${categoryId.id}`);
                  localStorage.removeItem('remainingTime');
                }}>Boshlash</AddButtons>
              </div>
            </div>
          </div>
        </GlobalModal>
      </div>
    </>
  );
};

export default ClientQuizStart;