import React from 'react';
import AddButtons from './buttons/buttons';
import { CategoryClientList } from '../types/category';

const CategoryCard: React.FC<{ data: CategoryClientList, onClick: () => void }> = ({ data, onClick }) => {
    return (
        <div className="flex flex-col lg:flex-row border p-4 rounded-lg shadow-md">
            
            <div className="w-full pl-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Yo'nalish:</span>
                    <span className="font-semibold text">{data.name}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Savollar soni:</span>
                    <span className="text-gray-700">{data.countQuiz} та</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Test ishlashga ajratilgan vaqt:</span>
                    <span className="text-gray-700">{data.durationTime} (min.)</span>
                </div>
                <div>
                    <AddButtons onClick={onClick}>Boshlash</AddButtons>
                </div>
            </div>
        </div>
    );
}

export default CategoryCard;
