import React from 'react';
import { useStore } from '../lib/store';
import { format } from 'date-fns';
import { Check, Clock, FileEdit, X } from 'lucide-react';
import { statusConfig } from '../lib/constants';

const iconMap = {
  FileEdit,
  Clock,
  Check
};

const PostModal = () => {
  const selectedPost = useStore(state => state.selectedPost);
  const setSelectedPost = useStore(state => state.setSelectedPost);

  if (!selectedPost) return null;

  const StatusIcon = iconMap[statusConfig[selectedPost.status].icon];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick={() => setSelectedPost(null)}
    >
      <div
        className="bg-white rounded-lg max-w-2xl w-full p-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">Post Details</h2>
            <span className={`
              flex items-center gap-1 px-2 py-1 rounded-full text-sm
              ${statusConfig[selectedPost.status].bgColor}
              ${statusConfig[selectedPost.status].className}
            `}>
              <StatusIcon className="w-4 h-4" />
              {statusConfig[selectedPost.status].label}
            </span>
          </div>
          <button
            onClick={() => setSelectedPost(null)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <p className={`text-gray-700 ${selectedPost.status === 'draft' ? 'italic' : ''}`}>
            {selectedPost.text}
          </p>
          
          {selectedPost.media.length > 0 && (
            <div className="mt-4">
              <img
                src={selectedPost.media[0].url}
                alt="Post media"
                className="w-full max-h-96 object-contain rounded"
              />
            </div>
          )}
          
          <div className="mt-4">
            <h3 className="font-medium mb-2">Scheduled for</h3>
            <p className="text-gray-600">
              {format(new Date(selectedPost.scheduledDateTime), 'PPP p')}
            </p>
          </div>
          
          <div className="mt-4">
            <h3 className="font-medium mb-2">Platforms</h3>
            <div className="flex gap-2">
              {selectedPost.platforms.map(platform => (
                <span
                  key={platform}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;