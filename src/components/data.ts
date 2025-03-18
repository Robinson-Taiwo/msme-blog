// Define the interface for a single story item
interface StoryItem {
  id: number;
  category: string;
  title: string;
  content: string; // Changed from description to match StoryCardProps
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  stats: {
    likes: string;
    comments: string; // Changed from views to match StoryCardProps
  };
}

// Define the story array
const story: StoryItem[] = [
  {
    id: 1,
    category: "Science fiction",
    title: "THE WAR OF THE WORLD",
    content: "For a writing interface, the navigation should be intuitive and structured to enhance the user experience. Here are some essential navigation for a writing interface, the navigation should be intuitive and structured to enhance the user experience.",
    author: {
      name: "Helon Habila",
      avatar: "https://ui-avatars.com/api/?name=Helon+Habila&background=random",
    },
    date: "21.09.2024",
    stats: {
      likes: "12.1k",
      comments: "27.1k", // Changed from views
    },
  },
  {
    id: 2,
    category: "Fantasy",
    title: "THE DRAGON'S LAIR",
    content: "For a writing interface, the navigation should be intuitive and structured to enhance the user experience. Here are some essential navigation For a writing interface, the navigation should be intuitive and structured to enhance the user experie",
    author: {
      name: "Sarah J. Maas",
      avatar: "https://ui-avatars.com/api/?name=Sarah+J.+Maas&background=random",
    },
    date: "15.10.2024",
    stats: {
      likes: "8.5k",
      comments: "15.3k", // Changed from views
    },
  },
  {
    id: 3,
    category: "Mystery",
    title: "THE SHADOW CIPHER",
    content: "A cryptic puzzle leads to a hidden truth in this thrilling mystery. Unravel the clues with each turn of the page.",
    author: {
      name: "Agatha Christie",
      avatar: "https://ui-avatars.com/api/?name=Agatha+Christie&background=random",
    },
    date: "01.11.2024",
    stats: {
      likes: "6.2k",
      comments: "10.9k", // Changed from views
    },
  },
];

export default story;