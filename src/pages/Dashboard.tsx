import React, { useEffect, useState } from 'react';
import CardDataStats from '../components/CardDataStats.tsx';
import ChartOne from '../components/Charts/ChartOne.tsx';
import UniversalTable, { IThead } from '../components/Tables/UniversalTable.tsx';
import { Select } from 'antd';
import { getAdminCategory } from '../common/logic-functions/category.tsx';
import categoryStore from '../common/state-management/categoryStore.tsx';
import {
  getAdminDashboardStatisticAll,
  getAdminDashboardStatisticCard
} from '../common/logic-functions/dashboard.tsx';
import dashboardStore from '../common/state-management/dashboardStore.tsx';
import { BiCategory } from 'react-icons/bi';
import { FaCircleQuestion } from 'react-icons/fa6';
import { PiArrowsOutCardinal } from 'react-icons/pi';
import { FaUsers } from 'react-icons/fa';
import { Pagination } from 'antd';
import { getRegions } from '../common/global-functions';
import globalStore from '../common/state-management/globalStore.tsx';
import { CategoryList } from '../types/category.ts';

const thead: IThead[] = [
  { id: 1, name: 'Т/Р' },
  { id: 2, name: 'Исм' },
  { id: 3, name: 'Фамилия' },
  { id: 4, name: 'Категория номи' },
  { id: 5, name: 'Натижа (Тўғри жавоблар/Умумий саволлар)' }
];
const { Option } = Select;

const Dashboard: React.FC = () => {
  const { setCategoryData, categoryData } = categoryStore();
  const { statisticTable, setStatisticTable, statisticsCard, setStatisticsCard, page, setPage } = dashboardStore();
  const { region, setRegion } = globalStore();
  const [totalPage, setTotalPage] = useState(0);
  const [categoryID, setCategoryID] = useState(null);
  const [regionID, setRegionID] = useState(null);

  useEffect(() => {
    getAdminCategory(setCategoryData);
    getRegions(setRegion);
    getAdminDashboardStatisticCard(setStatisticsCard);
    getAdminDashboardStatisticAll(setStatisticTable, page, setTotalPage);
  }, []);

  useEffect(() => {
    getAdminDashboardStatisticAll(setStatisticTable, page, setTotalPage, regionID ? regionID : '', categoryID ? categoryID : '');
  }, [page, categoryID, regionID]);

  const onChange = (page: number): void => setPage(page - 1);
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Умумий категория" total={`${statisticsCard ? statisticsCard.categoryCount : 0}`} rate="">
          <div className="fill-primary dark:fill-white w-14 h-14 rounded-full flex justify-center items-center">
            <BiCategory className={`text-2xl`} />
          </div>
        </CardDataStats>
        <CardDataStats title="Умумий савол" total={`${statisticsCard ? statisticsCard.questionCount : 0}`} rate="">
          <div className="fill-primary dark:fill-white w-14 h-14 rounded-full flex justify-center items-center">
            <FaCircleQuestion className={`text-2xl`} />
          </div>
        </CardDataStats>
        <CardDataStats title="Умумий натижа" total={`${statisticsCard ? statisticsCard.resultCount : 0}`} rate="">
          <div className="fill-primary dark:fill-white w-14 h-14 rounded-full flex justify-center items-center">
            <PiArrowsOutCardinal className={`text-2xl`} />
          </div>
        </CardDataStats>
        <CardDataStats title="Жами фойдаланувчилар" total={`${statisticsCard ? statisticsCard.userCount : 0}`} rate="">
          <div className="fill-primary dark:fill-white w-14 h-14 rounded-full flex justify-center items-center">
            <FaUsers className={`text-2xl`} />
          </div>
        </CardDataStats>
      </div>

      <div className="mt-4 md:mt-6 2xl:mt-7.5">
        <ChartOne />
      </div>
      <div className={`mt-10`}>
        <div className={`w-full flex justify-between items-center flex-wrap md:flex-nowrap gap-5 mb-4`}>
          {categoryData && (
            <Select
              placeholder={`Категорияни танланг`}
              value={categoryID}
              className={`w-full bg-transparent rounded-[10px] h-10`}
              allowClear
              onChange={(value) => setCategoryID(value)}
            >
              {categoryData.map((item: CategoryList | any) => (
                <Option value={item.id} key={item.id}>{item.name}</Option>
              ))}
            </Select>
          )}
          {region && (
            <Select
              placeholder={`Вилоятни танланг`}
              value={regionID}
              className={`w-full bg-transparent rounded-[10px] h-10`}
              allowClear
              onChange={(value) => setRegionID(value)}
            >
              {region.map(item => (
                <Option value={item.id} key={item.id}>{item.name}</Option>
              ))}
            </Select>
          )}
        </div>
        <UniversalTable thead={thead}>
          {statisticTable ? (
            statisticTable.map((item, idx) => (
              <tr key={idx}>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <h5 className="font-medium text-black dark:text-white">
                    {(+page * 10) + idx + 1}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.firstName}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.lastName}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.categoryName}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.correctAnswers}
                  </p>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="border-b border-[#eee] p-5 dark:border-strokedark text-center">
                Статистика топилмади
              </td>
            </tr>
          )}
        </UniversalTable>
        {totalPage > 0 && (
          <Pagination
            showSizeChanger={false}
            responsive={true}
            defaultCurrent={1}
            total={totalPage}
            onChange={onChange}
            rootClassName={`mt-10 mb-5`}
          />
        )}
      </div>
    </>
  );
};

export default Dashboard;
