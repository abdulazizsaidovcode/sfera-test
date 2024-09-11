import { Link, useNavigate } from 'react-router-dom';
import authStore from '../../common/state-management/authStore.tsx';
import globalStore from '../../common/state-management/globalStore.tsx';
import { authRegister } from '../../common/logic-functions/auth.tsx';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import logo from '../../images/logo/Sfer 1.png';

const SignUp = () => {
  const navigate = useNavigate();
  const {
    firstName,
    lastName,
    password,
    prePassword,
    phoneNumber,
    setPhoneNumber,
    setFirstName,
    setEmail,
    setLastName,
    setPassword,
    setPrePassword,
    setGender
  } = authStore();
  const { isLoading, setIsLoading, resData, setResData, passwordShow, setPasswordShow } = globalStore();

  useEffect(() => {
    if (resData) {
      setResData(false);
      setEmail('');
      setPassword('');
      setPrePassword('');
      setFirstName('');
      setLastName('');
      setPhoneNumber('');
      setGender('');
      toast.success('Руйхатдан утдингиз');
      navigate('/auth/signin');
    }
  }, [resData]);

  const passwordToggle = () => setPasswordShow(!passwordShow);

  return (
    <>
      <div>
        <div className="flex flex-wrap items-center justify-center">

          {/*two qism*/}
          <div className="w-full xl:w-1/2 ">
            <div className="w-full p-4 sm:p-12.5 bg-[#6A9C89] rounded-xl xl:p-17.5">
              <div className='flex flex-col'>
                <img className="w-35 " src={logo} alt="Logo" />
                <h2 className="mb-9 text-2xl font-bold text-white sm:text-title-xl2">
                  Рўйхатдан ўтиш
                </h2>
              </div>
              <form
                onSubmit={e => {
                  e.preventDefault()
                  authRegister(e, firstName, lastName, password, prePassword, setIsLoading, setResData, phoneNumber);
                }}
              >
                {/*first name*/}
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-white">
                    Исм
                  </label>
                  <div className="relative">
                    <input
                      required
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      placeholder="Исмингизни киритинг"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none bg-white"
                    />

                    <span className="absolute right-4 top-4">
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M11.0008 9.52185C13.5445 9.52185 15.607 7.5281 15.607 5.0531C15.607 2.5781 13.5445 0.584351 11.0008 0.584351C8.45703 0.584351 6.39453 2.5781 6.39453 5.0531C6.39453 7.5281 8.45703 9.52185 11.0008 9.52185ZM11.0008 2.1656C12.6852 2.1656 14.0602 3.47185 14.0602 5.08748C14.0602 6.7031 12.6852 8.00935 11.0008 8.00935C9.31641 8.00935 7.94141 6.7031 7.94141 5.08748C7.94141 3.47185 9.31641 2.1656 11.0008 2.1656Z"
                            fill=""
                          />
                          <path
                            d="M13.2352 11.0687H8.76641C5.08828 11.0687 2.09766 14.0937 2.09766 17.7719V20.625C2.09766 21.0375 2.44141 21.4156 2.88828 21.4156C3.33516 21.4156 3.67891 21.0719 3.67891 20.625V17.7719C3.67891 14.9531 5.98203 12.6156 8.83516 12.6156H13.2695C16.0883 12.6156 18.4258 14.9187 18.4258 17.7719V20.625C18.4258 21.0375 18.7695 21.4156 19.2164 21.4156C19.6633 21.4156 20.007 21.0719 20.007 20.625V17.7719C19.9039 14.0937 16.9133 11.0687 13.2352 11.0687Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>

                {/*last name*/}
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-white">
                    Фамилия
                  </label>
                  <div className="relative">
                    <input
                      required
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      placeholder="Фамилиянгизни киритинг"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none bg-white"
                    />

                    <span className="absolute right-4 top-4">
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M11.0008 9.52185C13.5445 9.52185 15.607 7.5281 15.607 5.0531C15.607 2.5781 13.5445 0.584351 11.0008 0.584351C8.45703 0.584351 6.39453 2.5781 6.39453 5.0531C6.39453 7.5281 8.45703 9.52185 11.0008 9.52185ZM11.0008 2.1656C12.6852 2.1656 14.0602 3.47185 14.0602 5.08748C14.0602 6.7031 12.6852 8.00935 11.0008 8.00935C9.31641 8.00935 7.94141 6.7031 7.94141 5.08748C7.94141 3.47185 9.31641 2.1656 11.0008 2.1656Z"
                            fill=""
                          />
                          <path
                            d="M13.2352 11.0687H8.76641C5.08828 11.0687 2.09766 14.0937 2.09766 17.7719V20.625C2.09766 21.0375 2.44141 21.4156 2.88828 21.4156C3.33516 21.4156 3.67891 21.0719 3.67891 20.625V17.7719C3.67891 14.9531 5.98203 12.6156 8.83516 12.6156H13.2695C16.0883 12.6156 18.4258 14.9187 18.4258 17.7719V20.625C18.4258 21.0375 18.7695 21.4156 19.2164 21.4156C19.6633 21.4156 20.007 21.0719 20.007 20.625V17.7719C19.9039 14.0937 16.9133 11.0687 13.2352 11.0687Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>

                {/*phone number*/}
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-white">
                    Телефон рақам
                  </label>
                  <div className="relative">
                    <input
                      required
                      value={phoneNumber}
                      onChange={e => setPhoneNumber(e.target.value)}
                      placeholder="Телефон рақамни киритинг"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none bg-white"
                    />

                    <span className="absolute right-4 top-4">
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M11.0008 9.52185C13.5445 9.52185 15.607 7.5281 15.607 5.0531C15.607 2.5781 13.5445 0.584351 11.0008 0.584351C8.45703 0.584351 6.39453 2.5781 6.39453 5.0531C6.39453 7.5281 8.45703 9.52185 11.0008 9.52185ZM11.0008 2.1656C12.6852 2.1656 14.0602 3.47185 14.0602 5.08748C14.0602 6.7031 12.6852 8.00935 11.0008 8.00935C9.31641 8.00935 7.94141 6.7031 7.94141 5.08748C7.94141 3.47185 9.31641 2.1656 11.0008 2.1656Z"
                            fill=""
                          />
                          <path
                            d="M13.2352 11.0687H8.76641C5.08828 11.0687 2.09766 14.0937 2.09766 17.7719V20.625C2.09766 21.0375 2.44141 21.4156 2.88828 21.4156C3.33516 21.4156 3.67891 21.0719 3.67891 20.625V17.7719C3.67891 14.9531 5.98203 12.6156 8.83516 12.6156H13.2695C16.0883 12.6156 18.4258 14.9187 18.4258 17.7719V20.625C18.4258 21.0375 18.7695 21.4156 19.2164 21.4156C19.6633 21.4156 20.007 21.0719 20.007 20.625V17.7719C19.9039 14.0937 16.9133 11.0687 13.2352 11.0687Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>
                {/*password*/}
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-white">
                    Парол
                  </label>
                  <div className="relative">
                    <input
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      type={passwordShow ? 'text' : 'password'}
                      placeholder="Паролингизни киритинг"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none bg-white"
                    />

                    <span
                      className={`absolute right-4 top-4 hover:cursor-pointer hover:text-primary duration-300`}
                      onClick={passwordToggle}
                    >
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                            fill=""
                          />
                          <path
                            d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                  <p className='text-white'>Парол камида 5 та ҳарф ёки рақамдан иборат бўлиши керак.</p>
                </div>

                {/*pre password*/}
                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-white">
                    Паролни тасдиқланг
                  </label>
                  <div className="relative">
                    <input
                      required
                      value={prePassword}
                      onChange={e => setPrePassword(e.target.value)}
                      type={passwordShow ? 'text' : 'password'}
                      placeholder="Паролни киритинг"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none bg-white"
                    />

                    <span
                      className={`absolute right-4 top-4 hover:cursor-pointer hover:text-primary duration-300`}
                      onClick={passwordToggle}
                    >
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                            fill=""
                          />
                          <path
                            d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>

                {/*confirm button*/}
                <div className="my-5">
                  <input
                    type="submit"
                    disabled={isLoading}
                    value={isLoading ? 'Юкланмоқда...' : 'Рўйхатдан ўтиш'}
                    className={`w-full ${isLoading ? 'cursor-not-allowed bg-slate-500' : 'cursor-pointer bg-[#16423C]'} rounded-lg p-4 text-white transition `}
                  />
                </div>

                <div className="mt-6 flex flex-col gap-5">
                  <p className="text-white">
                    Ҳисобингиз борми?{' '}
                    <Link to="/auth/signin" className='hover:underline'>
                      Тизимга кириш
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
