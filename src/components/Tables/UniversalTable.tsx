import React, { ReactNode } from 'react';
import { Popover } from 'antd';

// master global table
export interface IMasterTableProps {
  thead: IThead[];
  children: ReactNode;
}

// master global table thead lists
export interface IThead {
  id: number;
  name: string;
}

const UniversalTable: React.FC<IMasterTableProps> = ({ thead, children }) => {
  return (
    <div className="rounded-sm  bg-white dark:border-strokedark dark:bg-boxdark shadow-default">
      <div className="max-w-full overflow-x-auto w-[100%]">
        <table className="w-full table-auto">
          <thead>
          <tr className="text-left dark:bg-meta-4 bg-whiter">
            {thead.map((item) => (
              <th
                key={item.id}
                className="min-w-[150px] p-5 font-medium text-black dark:text-white"
              >
                {item.name.length > 15 ? <>
                  <Popover
                    title={item.name}
                    overlayStyle={{ textAlign: 'center' }}
                  >{item.name.slice(0, 15)}...</Popover>
                </> : item.name}
              </th>
            ))}
          </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
};

export default UniversalTable;