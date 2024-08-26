import React from 'react';
import { CategoryClientList } from '../types/category';
import defaultIMage from '../images/default.png'
import AddButtons from './buttons/buttons';
import { Image } from 'antd';
import { api_videos_files } from '../common/api/api';

const CategoryCard: React.FC<{ data: CategoryClientList, onClick: () => void }> = ({ data, onClick }) => {
    return (
        <div className="flex flex-col lg:flex-row border mt-3 p-4 rounded-lg shadow-md">
            <div className="w-full lg:w-auto flex items-center justify-center my-3">
                <Image
                    src={data.fileId ? api_videos_files + data.fileId : defaultIMage}
                    alt="Category image"
                    height={150}
                    width={270}
                    className="object-cover rounded"
                />
            </div>
            <div className="lg:w-3/4 w-full pl-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Ёналиш:</span>
                    <span className="font-semibold text">{data.name}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Вақт:</span>
                    <span className="text-gray-700">{data.duration} minut</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Саволлар:</span>
                    <span className="text-gray-700">{data.questionCount} ta</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Қайта топшириш:</span>
                    <span className="text-gray-700">{data.retakeDate} kun</span>
                </div>
                <div className="text-right">
                    <AddButtons onClick={onClick}>Бошлаш</AddButtons>
                </div>
            </div>
        </div>
    );
}

export default CategoryCard;
