import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: "post123",
    content: "Roadmap to become a full stack web3 developer in 180 days.",
    images: ["https://picsum.photos/id/1/800/600"],
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "joweltisso",
    firstName: "Jowel",
    lastName: "Tisso",
    userId: "jowel123",
    avatar: "https://i.pravatar.cc/150?img=60",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: "post345",
    content:
      "Love the idea behind this. A clear goal and how to achieve it. I believe as you go, you would realize that you need more time with some. And sometimes, I may intend to spend selected hours learning but end up spending more. Wish you the best!👍🏾",
    images: null,
    likes: {
      likeCount: 2,
      likedBy: [
        {
          _id: "jowel123",
          firstName: "jowel",
          lastName: "tisso",
          username: "joweltisso",
          password: "test123",
          bookmarks: [],
          createdAt: "2022-05-18T16:24:10+05:30",
          updatedAt: "2022-05-18T16:24:10+05:30",
          followers: [],
          following: [],
          id: "1",
        },
        {
          _id: "goku123",
          createdAt: "2022-05-18T16:35:54+05:30",
          updatedAt: "2022-05-18T16:35:54+05:30",
          username: "songoku",
          password: "goku",
          firstName: "Son",
          lastName: "Goku",
          email: "goku@gmail.com",
          followers: [],
          following: [],
          bookmarks: [],
          id: "2",
        },
      ],
      dislikedBy: [],
    },
    username: "songoku",
    firstName: "Son",
    lastName: "Goku",
    userId: "goku123",
    avatar: "https://i.pravatar.cc/150?img=54",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
