import React from 'react';
import { useStore } from '../lib/store';
import { format, startOfWeek, addDays, setHours, setMinutes, isToday } from 'date-fns';
import { useDrop } from 'react-dnd';
import PostCard from './PostCard';

const WeeklyCalendar = () => {
  const { posts, currentWeek } = useStore();
  
  const weekStart = startOfWeek(currentWeek);
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <div className="grid grid-cols-7 gap-4 p-4">
      {days.map((day, index) => (
        <DayColumn key={index} date={day} posts={posts} />
      ))}
    </div>
  );
};

const DayColumn = ({ date, posts }) => {
  const movePost = useStore(state => state.movePost);

  const [{ isOver }, drop] = useDrop({
    accept: 'POST',
    drop: (item) => {
      const originalDate = new Date(posts.find(p => p.id === item.id).scheduledDateTime);
      const newDate = setMinutes(
        setHours(date, originalDate.getHours()),
        originalDate.getMinutes()
      );
      movePost(item.id, newDate.toISOString());
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const dayPosts = posts.filter(post => 
    format(new Date(post.scheduledDateTime), 'yyyy-MM-dd') === 
    format(date, 'yyyy-MM-dd')
  );

  const isCurrentDay = isToday(date);

  return (
    <div
      ref={drop}
      className={`
        min-h-[600px] rounded-lg p-2
        ${isOver ? 'bg-blue-100' : 'bg-gray-50'}
        ${isCurrentDay ? 'bg-[#F5F5F5] border-2 border-[#E0E0E0]' : ''}
      `}
    >
      <h3 className="font-semibold text-center mb-2">
        {format(date, 'EEEE')}
      </h3>
      <p className="text-sm text-center mb-4 text-gray-500">
        {format(date, 'MMM d')}
      </p>
      <div className="space-y-2">
        {dayPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default WeeklyCalendar;