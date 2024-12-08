import React from 'react';
import { useStore } from '../lib/store';
import { addWeeks, subWeeks, startOfWeek, endOfWeek, format, isThisWeek } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarHeader = () => {
  const { currentWeek, setCurrentWeek } = useStore();

  const weekStart = startOfWeek(currentWeek);
  const weekEnd = endOfWeek(currentWeek);

  const navigateWeek = (direction) => {
    const newDate = direction === 'next' 
      ? addWeeks(currentWeek, 1)
      : subWeeks(currentWeek, 1);
    setCurrentWeek(newDate);
  };

  const goToToday = () => {
    setCurrentWeek(new Date());
  };

  const formatDateRange = () => {
    const start = format(weekStart, 'MMM d');
    const end = format(weekEnd, 'MMM d');
    const yearFormat = weekStart.getFullYear() !== weekEnd.getFullYear()
      ? ", yyyy" 
      : "";
    
    return `${start} - ${end}${yearFormat}, ${format(weekEnd, 'yyyy')}`;
  };

  return (
    <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigateWeek('prev')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Previous week"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <button
          onClick={() => navigateWeek('next')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Next week"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        
        <button
          onClick={goToToday}
          className={`px-4 py-2 rounded-md transition-colors ${
            isThisWeek(currentWeek)
              ? 'bg-gray-200 cursor-default'
              : 'hover:bg-gray-100'
          }`}
          disabled={isThisWeek(currentWeek)}
        >
          Today
        </button>
      </div>

      <h2 className="text-lg font-semibold">
        {formatDateRange()}
      </h2>
    </div>
  );
};

export default CalendarHeader;