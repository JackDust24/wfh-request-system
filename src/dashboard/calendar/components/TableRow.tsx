// TableRow.tsx
import React from 'react';
import { StatusCell } from './StatusCell';
import { CalendarDataType } from '../../../lib/types';

type TableRowProps = {
  entry: CalendarDataType;
  userEmail: string | null;
  weekDates: string[];
  onClick: (day: string, action: 'add' | 'delete') => void;
};

const dayMapping: {
  [key in
    | '2024-12-23'
    | '2024-12-24'
    | '2024-12-25'
    | '2024-12-26'
    | '2024-12-27']: string;
} = {
  '2024-12-23': 'monday',
  '2024-12-24': 'tuesday',
  '2024-12-25': 'wednesday',
  '2024-12-26': 'thursday',
  '2024-12-27': 'friday',
};

export function TableRow({
  entry,
  userEmail,
  weekDates,
  onClick,
}: TableRowProps) {
  return (
    <tr className='odd:bg-white even:bg-gray-50' role='row'>
      <td className='border p-2'>
        <div className='h-10 max-h-10 overflow-hidden flex items-center px-2'>
          <div className='line-clamp-2 text-sm'>{entry.user}</div>
        </div>
      </td>

      {weekDates.map((date, index) => {
        const dayName = dayMapping[date as keyof typeof dayMapping];
        const status = entry[dayName as keyof CalendarDataType];
        const isUser = userEmail === entry.email;
        const isClickable = isUser && status !== 'Unavailable';

        return (
          <StatusCell
            key={index}
            status={status}
            isClickable={isClickable}
            onClick={(action) => onClick(date, action)}
          />
        );
      })}
    </tr>
  );
}
