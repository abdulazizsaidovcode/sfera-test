import { create } from 'zustand';
import { ClientDashboardStatisticsList, Dashboard, DashboardListStatistic, DashboardListStatisticCards } from '../../types/dashboard.ts';

const dashboardStore = create<Dashboard>((set) => ({
  statisticTable: null,
  setStatisticTable: (val: DashboardListStatistic[] | null) => set({ statisticTable: val }),
  clientstatistic: null,
  setClientStatistic: (val: ClientDashboardStatisticsList[] | null) => set({ clientstatistic: val }),
  statisticsCard: null,
  setStatisticsCard: (val: DashboardListStatisticCards | null) => set({ statisticsCard: val }),
  page: 0,
  setPage: (val: number | string) => set({ page: val })
}));

export default dashboardStore;