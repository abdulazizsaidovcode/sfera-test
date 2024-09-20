import { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../images/logo/Sfer 1.png';
import { TbCategory } from "react-icons/tb";
import { FaRegNoteSticky } from 'react-icons/fa6';
import AddButtons from '../buttons/buttons';
import { IoIosLogOut } from 'react-icons/io';
import GlobalModal from '../modal/modal';


interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
  toggleModal: () => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen, toggleModal }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  const styles = {
    sidebar: 'group relative shadow-sideBarShadow flex items-center gap-2.5 rounded-lg py-3 px-4 my-1 font-medium text-white duration-300 ease-in-out'
  };

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-20 flex h-screen w-72.5 flex-col overflow-y-hidden bg-[#6A9C89] duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex justify-start items-center gap-2 px-6 pb-5.5 lg:pb-6.5">
        <NavLink to="/">
          <div className={`flex justify-start items-center w-full px-4 pt-5 lg:px-6`}>
            <img src={logo} alt="logo" className={`w-full`} />
          </div>
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">

          {/* <!-- Menu Group --> */}
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              <>
                <li>
                  <NavLink
                    to="/client/dashboard"
                    className={`${styles.sidebar} ${pathname === '/client/dashboard' && 'bg-[#16423C] dark:bg-meta-4'}`}
                  >
                    <TbCategory size={20} />
                    Natijalar
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/client/test/start"
                    className={`${styles.sidebar} ${pathname === '/client/test/start' && 'bg-[#16423C] dark:bg-meta-4'}`}
                  >
                    <FaRegNoteSticky size={20} />
                    Yo'nalishlar
                  </NavLink>
                </li>
              </>

            </ul>
          </div>
        </nav>
      </div>
      <div className='p-5 absolute bottom-0 w-full'>
        <AddButtons onClick={toggleModal} icon><IoIosLogOut size={20} /> CHIQISH</AddButtons>
      </div>
    </aside>
  );
};

export default Sidebar;
