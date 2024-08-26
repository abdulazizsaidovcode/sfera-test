import React from 'react';
import defaultIMage from '../images/default.png'
import { ClientDashboardStatisticsList } from '../types/dashboard';
import moment from 'moment';
import { LuUploadCloud } from "react-icons/lu";
import { api_videos_files } from '../common/api/api';
import { Popover } from 'antd';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ClientDashboardCard: React.FC<{ data: ClientDashboardStatisticsList, onEmailClick: () => void, onWebClick: () => void, isLoading: boolean, isEmailLoading: boolean }> = ({ data, onEmailClick, onWebClick, isLoading, isEmailLoading }) => {
    return (
        <div className="w-full lg:w-auto md:w-[48%] sm:w-[48%] border-2 border-black dark:border-white p-4 rounded-md">
            <div className="flex items-center justify-center mb-4">
                <img
                    src={data.fileId ? api_videos_files + data.fileId : defaultIMage}
                    alt="Your Image"
                    className="h-40 w-full  object-cover"
                />
            </div>
            <div className="text-center">
                <p className="font-bold text-lg text-red-600 dark:text-blue-600 mb-2">{data.categoryName}</p>
                <div className='flex justify-between'>
                    <div className='flex flex-col items-start'>
                        <p className='text-start'>Тўғри жавоблар:</p>
                        <p className='text-start'>Вақт:</p>
                        <p className='text-start'>Балл:</p>
                        <p className='text-start'>Сана:</p>
                    </div>
                    <div className='flex flex-col items-end'>
                        <strong>{`${data.correctAnswers}/${data.countAnswers}`}</strong>
                        <strong>{`${data.durationTime}`}</strong>
                        <strong>{data.testScore | 0}</strong>
                        <strong>{moment(data.createdAt).format('LL')}</strong>
                    </div>
                </div>
            </div>
            <div className={data.status === 'APPROVED' ? 'flex lg:gap-2 justify-between items-center' : ''}>
                <div className={data.status === 'APPROVED' ? 'mt-4 bg-green-600 w-[70%] text-white py-2 px-4 flex justify-center items-center rounded' : data.status === 'WAITING' ? 'mt-4 bg-yellow-600 text-white py-2 px-4 flex justify-center items-center rounded' : 'mt-4 bg-red-600 text-white py-2 px-4 flex justify-center items-center rounded'}>
                    {data.status === 'APPROVED' ? 'Тасдиқланди' : data.status === 'WAITING' ? 'Кутилмоқда' : 'Бекор қилинди'}
                </div>
                {data.status === 'APPROVED' &&
                    <Popover title="Сертификатни электрон почтадан юклаш">
                        <div onClick={onEmailClick} className=' bg-green-600 py-3 cursor-pointer px-3 mt-4 rounded-full'>
                            {isEmailLoading ? <AiOutlineLoading3Quarters className='spin' color='#fff' /> : <LuUploadCloud color='#fff' />}
                        </div>
                    </Popover>
                }
                {data.status === 'APPROVED' &&
                    <Popover title="Сертификатни сайтдан юклаш">
                        <div onClick={onWebClick} className=' bg-green-600 py-3 cursor-pointer px-3 mt-4 rounded-full'>
                            {isLoading ? <AiOutlineLoading3Quarters className='spin' color='#fff' /> : <LuUploadCloud color='#fff' />}
                        </div>
                    </Popover>
                }
            </div>
        </div >
    );
};

export default ClientDashboardCard;
