import React, { useEffect, useState } from 'react';
import CategoryCard from '../../components/CategoryCard';
import categoryStore from '../../common/state-management/categoryStore';
import { getClientCategory } from '../../common/logic-functions/category';
import { Skeleton } from 'antd';
import { MdOutlineNotStarted } from 'react-icons/md';
import GlobalModal from '../../components/modal/modal';
import AddButtons from '../../components/buttons/buttons';
import { useNavigate } from 'react-router-dom';

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
          <p className="text-center text-[#16423C] text-3xl font-bold">Йўналишлар</p>
          {/* <p className="text-black dark:text-white text-xl font-bold">Ҳуш келибсиз, {getMee && getMee.fullName}</p> */}
        </div>
        {isLoading ? <Skeleton /> :
          clientCategoryData && clientCategoryData.length !== 0 ? <div>
            {clientCategoryData &&clientCategoryData.map((item) => (
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
            <p className="text-xl">Йўналишлар топилмади</p>
          </div>
        }
        <GlobalModal isOpen={isModal} onClose={toggleModal}>
          <div className="w-54 sm:w-64 md:w-96 lg:w-[40rem]">
            <div className="flex flex-col justify-center items-center">
              <MdOutlineNotStarted className="text-[#16423C]" size={100} />
              <p className="text-center sm:text-[17px]">Ҳақиқатдан ҳам <span className={`font-bold text-[#16423C]`}>{categoryId.name}</span> йўналиш бўйича тест бошламоқчимисиз?</p>
              <div className="flex gap-3 mt-4">
                <AddButtons onClick={toggleModal}>Орқага</AddButtons>
                <AddButtons onClick={() => {
                  navigation(`/client/quiz/${categoryId.id}`);
                  localStorage.removeItem('remainingTime');
                }}>Бошлаш</AddButtons>
              </div>
            </div>
          </div>
        </GlobalModal>
      </div>
    </>
  );
};

export default ClientQuizStart;