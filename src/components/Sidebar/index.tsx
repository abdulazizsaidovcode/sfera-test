import { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import lightLogo from '../../images/logo/geodeziya_light.png';
import darkLogo from '../../images/logo/geodeziya_dark.png';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;
  const role = localStorage.getItem('ROLE');

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
    sidebar: 'group relative shadow-sideBarShadow flex items-center gap-2.5 rounded-sm py-3 px-4 my-1 font-medium text-graydark dark:text-bodydark1 duration-300 ease-in-out hover:bg-slate-300 dark:hover:bg-graydark dark:hover:bg-meta-4'
  };

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex justify-start items-center gap-2 px-6 pb-5.5 lg:pb-6.5">
        <NavLink to="/">
          <div className={`flex justify-start items-center w-full px-4 lg:px-6`}>
            <img src={darkLogo} alt="logo" className={`w-full h-20 scale-[2.5] dark:inline hidden`} />
            <img src={lightLogo} alt="logo" className={`w-full h-20 scale-[2.5] dark:hidden inline`} />
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
              {/* <!-- Menu Item Dashboard ADMIN or SUPER_ADMIN --> */}
              {role === 'ROLE_SUPER_ADMIN' && (
                <li>
                  <NavLink
                    to="/dashboard"
                    className={`${styles.sidebar} ${pathname.includes('dashboard') && 'bg-slate-200 dark:bg-graydark dark:bg-meta-4'}`}
                  >
                    Бошқарув панели
                  </NavLink>
                </li>
              )}

              {(role === 'ROLE_TESTER' || role === 'ROLE_SUPER_ADMIN') && (
                <>
                  {/* <!-- Menu Item Category --> */}
                  <li>
                    <NavLink
                      to="/category"
                      className={`${styles.sidebar} ${pathname.includes('category') && 'bg-slate-200 dark:bg-graydark dark:bg-meta-4'}`}
                    >
                      Категория
                    </NavLink>
                  </li>

                  {/* <!-- Menu Item Test --> */}
                  <li>
                    <NavLink
                      to="/test"
                      className={`${styles.sidebar} ${pathname.includes('test') && 'bg-slate-200 dark:bg-graydark dark:bg-meta-4'}`}
                    >
                      Тест
                    </NavLink>
                  </li>
                </>
              )}

              {role === 'ROLE_SUPER_ADMIN' && (
                <>
                  <li>
                    <NavLink
                      to="/all-user"
                      className={`${styles.sidebar} ${pathname === '/all-user' && 'bg-slate-200 dark:bg-graydark dark:bg-meta-4'}`}
                    >
                      Фойдаланувчилар
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/user"
                      className={`${styles.sidebar} ${pathname === '/user' && 'bg-slate-200 dark:bg-graydark dark:bg-meta-4'}`}
                    >
                      Фойдаланувчилар натижаси
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/employees"
                      className={`${styles.sidebar} ${pathname.includes('employees') && 'bg-slate-200 dark:bg-graydark dark:bg-meta-4'}`}
                    >
                      Ходимлар
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/address"
                      className={`${styles.sidebar} ${pathname === '/address' && 'bg-slate-200 dark:bg-graydark dark:bg-meta-4'}`}
                    >
                      Манзил
                    </NavLink>
                  </li>
                </>
              )}

              {/*CLIENT Menu item*/}
              {role === 'ROLE_CLIENT' && (
                <>
                  <li>
                    <NavLink
                      to="/client/dashboard"
                      className={`${styles.sidebar} ${pathname === '/client/dashboard' && 'bg-slate-200 dark:bg-graydark dark:bg-meta-4'}`}
                    >
                      Бошқарув панели
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/client/test/start"
                      className={`${styles.sidebar} ${pathname === '/client/test/start' && 'bg-slate-200 dark:bg-graydark dark:bg-meta-4'}`}
                    >
                      Тест
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
