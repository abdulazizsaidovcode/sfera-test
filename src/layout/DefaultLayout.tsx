import React, { useState, ReactNode } from 'react';
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar/index';
import { useLocation, useNavigate } from 'react-router-dom';
import GlobalModal from '../components/modal/modal';
import { IoIosLogOut } from 'react-icons/io';
import AddButtons from '../components/buttons/buttons';

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { pathname  } = useLocation();
  const navigate = useNavigate()
  const role = localStorage.getItem('ROLE');

  const toggleModal = () => setIsOpen(!isOpen)

  return (
    <div className="dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        {!(pathname.startsWith('/auth') || role === 'ROLE_ADMIN' || pathname.startsWith('/archive') || pathname.startsWith('/client/quiz/')) && (
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} toggleModal={toggleModal} />
        )}

        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {!(pathname.startsWith('/auth') || pathname.startsWith('/archive') || pathname.startsWith('/client/quiz/')) && (
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          )}

          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
        </div>
      </div>
      <GlobalModal isOpen={isOpen} onClose={toggleModal}>
        <div className="w-54 sm:w-64 md:w-96 lg:w-[40rem] flex flex-col gap-3 items-center justify-center">
          <IoIosLogOut color='#16423C' size={100}/>
          <p className='text-2xl text-center text-black-2'>Siz aniq bu tizimdan chiqmoqchimisz</p>
          <div className='flex gap-3'>
            <AddButtons onClick={toggleModal}>Orqaga</AddButtons>
            <AddButtons onClick={() => {
              localStorage.clear()
              navigate('/auth/signin');
              toggleModal()
            }}>Chiqish</AddButtons>
          </div>
        </div>
      </GlobalModal>
    </div>
  );
};

export default DefaultLayout;
