import React from 'react';
import { CategoryClientList } from '../types/category';
import AddButtons from './buttons/buttons';

const CategoryCard: React.FC<{ data: CategoryClientList, onClick: () => void }> = ({ data, onClick }) => {
    return (
        <div className="flex flex-col lg:flex-row border mt-3 p-4 rounded-lg shadow-md">
            
            <div className="w-full pl-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Йўналиш:</span>
                    <span className="font-semibold text">{data.name}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Тест ишлашга ажратилган вақт:</span>
                    <span className="text-gray-700">{data.durationTime} (дақ.)</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Саволлар сони:</span>
                    <span className="text-gray-700">{data.countQuiz} та</span>
                </div>
                <div className="text-right">
                    <AddButtons onClick={onClick}>Бошлаш</AddButtons>
                </div>
            </div>
        </div>
    );
}

export default CategoryCard;
