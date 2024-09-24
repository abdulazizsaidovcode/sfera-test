import React from 'react';
import { ClientDashboardStatisticsList } from '../types/dashboard';
import moment from 'moment';
import { LuUploadCloud } from "react-icons/lu";
import { Popover } from 'antd';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BorderBeam } from './magicui/border-beam';
import Meteors from './magicui/meteors';

const ClientDashboardCard: React.FC<{ 
  data: ClientDashboardStatisticsList, 
  onEmailClick: () => void, 
  onWebClick: () => void, 
  isLoading: boolean, 
  isEmailLoading: boolean 
}> = ({ data, onEmailClick, onWebClick, isLoading, isEmailLoading }) => {
  return (
    <div className="w-full relative overflow-hidden border-[1px] border-black dark:border-white p-4 rounded-md">
      {/* <div className="flex items-center justify-center mb-4">
        <img
          src={data.fileId ? api_videos_files + data.fileId : defaultIMage}
          alt="Your Image"
          className="h-40 w-full  object-cover"
        />
      </div> */}
      <div className="text-center">
        <p className="font-bold text-lg text-[#16423C] mb-2">{data.categoryName}</p>
        <div className='flex justify-between gap-10'>
          <div className='flex flex-col items-start'>
            <p className='text-start'>Тўғри жавоблар:</p>
            <p className='text-start'>Вақт давомийлиги:</p>
            {/* <p className='text-start'>Тўпланган балл:</p> */}
            <p className='text-start'>Тест топширилган сана:</p>
          </div>
          <div className='flex flex-col items-end'>
            <strong>{`${data.correctAnswer}/${data.countAnswer}`}</strong>
            <strong>{`${data.duration | 0} (дақ.)`}</strong>
            {/* <strong>{data. | 0}</strong> */}
            <strong>{moment(data.createdAt).format('DD.MM.YYYY')}</strong>
          </div>
        </div>
      </div>
      <div>
        <div className={data.status === 'A\'lo' ? 'mt-4 bg-green-600 text-white py-2 px-4 flex justify-center items-center rounded' : data.status === 'Yaxshi' ? 'mt-4 bg-yellow-600 text-white py-2 px-4 flex justify-center items-center rounded' : 'mt-4 bg-red-600 text-white py-2 px-4 flex justify-center items-center rounded'}>
          {data.status === 'A\'lo' ? 'A\'lo' : data.status === 'Yaxshi' ? 'Yaxshi' : 'Yomon'}
        </div>
        {/* {data.status === 'A\'lo' &&
          <Popover title="Сертификатни электрон почта орқали юклаб олиш">
            <div onClick={onEmailClick} className=' bg-green-600 py-3 cursor-pointer px-3 mt-4 rounded-full'>
              {isEmailLoading ? <AiOutlineLoading3Quarters className='spin' color='#fff' /> : <LuUploadCloud color='#fff' />}
            </div>
          </Popover>
        }
        {data.status === 'A\'lo' &&
          <Popover title="Сертификатни сайтдан юклаб олиш">
            <div onClick={onWebClick} className=' bg-green-600 py-3 cursor-pointer px-3 mt-4 rounded-full'>
              {isLoading ? <AiOutlineLoading3Quarters className='spin' color='#fff' /> : <LuUploadCloud color='#fff' />}
            </div>
          </Popover>
        } */}
      </div>
      <BorderBeam size={250} borderWidth={2} duration={12} delay={9} />
      <Meteors number={30} />
    </div>
  );
};

export default ClientDashboardCard;
