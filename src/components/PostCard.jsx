import React, { memo } from 'react';
import { useDrag } from 'react-dnd';
import { useStore } from '../lib/store';
import { format } from 'date-fns';
import { Check, Clock, FileEdit } from 'lucide-react';
import { statusConfig } from '../lib/constants';

const iconMap = {
  FileEdit,
  Clock,
  Check
};

// Memoize the PostCard component to prevent unnecessary re-renders
const PostCard = memo(({ post }) => {
  const setSelectedPost = useStore(state => state.setSelectedPost);
  
  const [{ isDragging }, drag] = useDrag({
    type: 'POST',
    item: { id: post.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const time = format(new Date(post.scheduledDateTime), 'h:mm a');
  const StatusIcon = iconMap[statusConfig[post.status].icon];

  return (
    <div
      ref={drag}
      onClick={() => setSelectedPost(post)}
      className={`
        p-3 rounded-lg bg-white shadow-sm border
        cursor-pointer hover:shadow-md transition-shadow
        ${isDragging ? 'opacity-50' : 'opacity-100'}
        ${statusConfig[post.status].bgColor}
      `}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <StatusIcon className={`w-4 h-4 ${statusConfig[post.status].className}`} />
          <span className={`text-xs ${statusConfig[post.status].className}`}>
            {statusConfig[post.status].label}
          </span>
        </div>
        <span className="text-xs text-gray-500">{time}</span>
      </div>
      
      <p className={`text-sm font-medium truncate ${post.status === 'draft' ? 'italic' : ''}`}>
        {post.text}
      </p>

      <div className="flex flex-wrap gap-1 mt-2">
        {post.platforms.map(platform => (
          <span
            key={platform}
            className="text-xs px-2 py-1 bg-gray-100 rounded-full"
          >
            {platform}
          </span>
        ))}
      </div>
      
      {post.media.length > 0 && (
        <div className="mt-2">
          <img
            src={post.media[0].url}
            alt="Post media"
            className="w-full h-20 object-cover rounded"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
});

PostCard.displayName = 'PostCard';

export default PostCard;