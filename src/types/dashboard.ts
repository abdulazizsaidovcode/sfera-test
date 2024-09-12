export interface Dashboard {
  statisticTable: null | DashboardListStatistic[];
  setStatisticTable: (val: null|DashboardListStatistic[]) => void;
  clientstatistic: null | ClientDashboardStatisticsList[];
  setClientStatistic: (val: ClientDashboardStatisticsList[] | null) => void;
  statisticsCard: DashboardListStatisticCards | null;
  setStatisticsCard: (val: DashboardListStatisticCards | null) => void;
  page: number | string;
  setPage: (page: number | string) => void;
}

export interface DashboardListStatistic {
  firstName: string;
  lastName: string;
  categoryName: string;
  correctAnswers: number;
}

export interface DashboardListStatisticCards {
  categoryCount: number;
  questionCount: number;
  userCount: number;
  resultCount: number;
}

export interface ClientDashboardStatisticsList {
  id: number,
  userId: number,
  categoryName: string,
  countAnswer: number,
  correctAnswer: number,
  duration: number,
  status: string,
  createdAt: string
}