import { ApexOptions } from 'apexcharts';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { config } from '../../common/api/token';
import { statistics_day } from '../../common/api/api';
import { consoleClear } from '../../common/console-clear/console-clear.tsx';
import moment from 'moment';
import 'moment/locale/uz';

interface ChartData {
  dayOfWeek: string;
  value?: number;
}

const ChartOne: React.FC = () => {
  const [chart, setChart] = useState<ChartData[]>([]);
  const [state, setState] = useState<any>({
    series: [
      {
        name: 'Ечилганлар сони',
        data: chart.map((item) => item.value)
      }
    ]
  });

  useEffect(() => {
    getStatistics();
  }, []);

  useEffect(() => {
    setState({
      series: [
        {
          name: 'Ечилганлар сони',
          data: chart.map((item: any) => item.count)
        }
      ]
    });
  }, [chart]);

  const getStatistics = async () => {
    try {
      const { data } = await axios.get(statistics_day, config);
      if (data.success) {
        setChart(data.body);
        consoleClear();
      } else {
        setChart([]);
        consoleClear();
      }
    } catch {
      setChart([]);
      consoleClear();
    }
  };

  // let maxCHart = chart[0]?.value;
  // for (let i = 0; i < chart.length; i++) {
  //   if (maxCHart && chart[i].value) {
  //     if (maxCHart > chart[i]?.value) maxCHart = chart[i].value;
  //   }
  // }

  const options: ApexOptions = {
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'left'
    },
    colors: ['#3C50E0', '#80CAEE'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      height: 335,
      type: 'area',
      dropShadow: {
        enabled: true,
        color: '#623CEA14',
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1
      },
      toolbar: {
        show: false
      }
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300
          }
        }
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350
          }
        }
      }
    ],
    stroke: {
      width: [2, 2],
      curve: 'smooth'
    },
    grid: {
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 4,
      colors: '#fff',
      strokeColors: ['#3056D3', '#80CAEE'],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5
      }
    },
    xaxis: {
      type: 'category',
      categories: chart.map((item) => getWeekdayName(item.dayOfWeek)),
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      title: {
        style: {
          fontSize: '0px'
        }
      },
      min: 0,
      max: 200
    }
  };

  moment.locale('uz', {
    weekdays: 'Якшанба_Душанба_Сешанба_Чоршанба_Пайшанба_Жума_Шанба'.split('_'),
    weekdaysShort: 'Якш_Душ_Сеш_Чор_Пай_Жума_Шан'.split('_'),
    weekdaysMin: 'Як_Ду_Се_Чо_Па_Жу_Ша'.split('_')
  });

  function getWeekdayName(dayNumber: any) {
    return moment().day(dayNumber).format('dddd');
  }

  return (
    <div
      className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span
              className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Ҳафталик маълумот</p>
              {/*<p className="text-sm font-medium">12.04.2022 - 12.05.2022</p>*/}
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">

            <button className="rounded py-1 px-3 text-xs font-medium text-black  dark:text-white dark:hover:bg-boxdark">
              Ҳафта
            </button>

          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
