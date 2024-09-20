import React, { useEffect, useState } from 'react';
import { getMe } from '../../common/global-functions';
import ClientDashboardCard from '../../components/ClientDashboardCard';
import { getClientCertificate, getClientDashboardStatistic, getUserStatistic } from '../../common/logic-functions/dashboard';
import dashboardStore from '../../common/state-management/dashboardStore';
import { getCertificate } from '../../common/logic-functions/test';
import { BorderBeam } from '@/components/magicui/border-beam';
import NumberTicker from '@/components/magicui/number-ticker';
import Meteors from '@/components/magicui/meteors';
import { GetMeeTypes } from '@/types/auth';
import CustomSkeleton from '@/components/skeleton/custom-skeleton';

const ClientDashboard: React.FC = () => {
  const { clientstatistic, setClientStatistic } = dashboardStore();
  const [getMee, setGetMee] = useState<GetMeeTypes>();
  const [isLoading, setIsLoading] = useState(false);
  const [statistic, setStatictic] = useState<any>({});
  const [loadingStates, setLoadingStates] = useState<{ [key: number]: { certificate: boolean, email: boolean } }>({});

  useEffect(() => {
    getMe(setGetMee);
    getUserStatistic(setStatictic)
  }, []);

  useEffect(() => {
    if (getMee?.userId) {
      getClientDashboardStatistic(getMee?.userId, setClientStatistic, setIsLoading);
    }
  }, [getMee]);

  const handleUploadCertificate = (id: number) => {
    setLoadingStates(prev => ({ ...prev, [id]: { ...prev[id], certificate: true } }));
    getClientCertificate(id, setLoadingStates);
  };

  const handleEmailClick = (id: number) => {
    setLoadingStates(prev => ({ ...prev, [id]: { ...prev[id], email: true } }));
    getCertificate(id, setLoadingStates);
  };

  return (
    <>
      <div>
        <div>
          <p className="text-center text-[#16423C] text-3xl font-bold">Sizning natijalaringiz</p>
          <p className="text-black dark:text-white text-xl font-bold mt-3">
            {getMee ? `${getMee.firstName} ${getMee.lastName}` : 'Меҳмон'}
          </p>
        </div>
        <div className='grid md:grid-cols-3 grid-cols-1 gap-3 mt-3'>
          <div className='bg-[#6A9C89] relative overflow-hidden py-10 px-6 rounded-2xl'>
            <p className='text-lg text-gray'>Natijalar soni</p>
            <p className=' text-white font-semibold text-3xl'>
              {statistic && statistic.countResult ? <NumberTicker value={statistic.countResult} /> : 0}
            </p>
            <Meteors number={50} />
            <BorderBeam size={250} borderWidth={2} duration={12} delay={9} />
          </div>
          <div className='bg-[#6A9C89] relative overflow-hidden py-10 px-6 rounded-2xl'>
            <p className='text-lg text-gray'>Test ishlangan yo'nalishlar soni</p>
            <p className=' text-white font-semibold text-3xl'>
              {statistic && statistic.resultCategoryCount ? <NumberTicker value={statistic.resultCategoryCount} /> : 0}
            </p>
            <Meteors number={50} />
            <BorderBeam size={250} borderWidth={2} duration={12} delay={9} />
          </div>
          <div className='bg-[#6A9C89] relative overflow-hidden py-10 px-6 rounded-2xl'>
            <p className='text-lg text-gray'>Yuqori natijalar soni</p>
            <p className=' text-white font-semibold text-3xl'>
              {statistic && statistic.passedResultCount ? <NumberTicker value={statistic.passedResultCount} /> : 0}
            </p>
            <BorderBeam size={250} borderWidth={2} duration={12} delay={9} />
            <Meteors number={50} />
          </div>
        </div>

        {isLoading ? <div className='mt-10 grid grid-cols-3 gap-5'>{[...Array(6)].map((_, index) => <CustomSkeleton key={index} />)}</div>
          : clientstatistic ?
            <div className="mt-4">
              <div className="grid lg:grid-cols-3 gap-5 flex-wrap">
                {clientstatistic.map((item, index) => (
                  <ClientDashboardCard
                    data={item}
                    isLoading={loadingStates[item.id]?.certificate || false}
                    isEmailLoading={loadingStates[item.id]?.email || false}
                    onEmailClick={() => handleEmailClick(item.id)}
                    onWebClick={() => handleUploadCertificate(item.id)}
                    key={index}
                  />
                ))}
              </div>
            </div>
            : <div className="flex h-[67vh] justify-center items-center">
              <p className="text-xl">Natijalar mavjud emas</p>
            </div>
        }
      </div>
    </>
  );
};

export default ClientDashboard;
