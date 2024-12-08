import { create } from 'zustand';
import { startOfWeek, addDays } from 'date-fns';

// Use stable image URLs that won't change with each render
const STABLE_IMAGES = {
  POST_1: "https://picsum.photos/seed/post1/200",
  POST_2: "https://picsum.photos/seed/post2/200",
  POST_3: "https://picsum.photos/seed/post3/200"
};

const mockPosts = [
  {
    id: "post_1",
    text: "Sample post content with a longer description that might need truncation in the calendar view",
    media: [{ type: "image", url: STABLE_IMAGES.POST_1 }],
    scheduledDateTime: new Date(2024, 11, 10, 10, 0).toISOString(),
    platforms: ["Twitter", "Discord", "Telegram"],
    status: "published"
  },
  {
    id: "post_2",
    text: "Another post example showing how multiple platforms can be handled",
    media: [],
    scheduledDateTime: new Date(2024, 11, 11, 14, 0).toISOString(),
    platforms: ["LinkedIn", "Reddit"],
    status: "scheduled"
  },
  {
    id: "post_3",
    text: "Draft post about upcoming product launch",
    media: [{ type: "image", url: STABLE_IMAGES.POST_2 }],
    scheduledDateTime: new Date(2024, 11, 12, 9, 0).toISOString(),
    platforms: ["Twitter", "Discord", "Reddit"],
    status: "draft"
  },
  {
    id: "post_4",
    text: "Exciting announcement about our new feature release!",
    media: [],
    scheduledDateTime: new Date(2024, 11, 13, 15, 30).toISOString(),
    platforms: ["Twitter", "LinkedIn", "Telegram"],
    status: "scheduled"
  },
  {
    id: "post_5",
    text: "Behind the scenes look at our team",
    media: [{ type: "image", url: STABLE_IMAGES.POST_3 }],
    scheduledDateTime: new Date(2024, 11, 14, 11, 0).toISOString(),
    platforms: ["Discord", "Reddit", "Telegram"],
    status: "draft"
  }
];

const store = (set) => ({
  posts: mockPosts,
  currentWeek: new Date(),
  selectedPost: null,
  
  setCurrentWeek: (date) => set({ currentWeek: date }),
  movePost: (postId, newDateTime) => set((state) => ({
    posts: state.posts.map(post =>
      post.id === postId
        ? { ...post, scheduledDateTime: newDateTime }
        : post
    )
  })),
  setSelectedPost: (post) => set({ selectedPost: post }),
});

export const useStore = create(store);