import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "jowel",
    lastName: "tisso",
    username: "joweltisso",
    password: "test123",
    bookmarks: [
      {
        _id: uuid(),
        content: "Roadmap to become a full stack web3 developer in 180 days.",
        images: ["https://picsum.photos/id/1/800/600"],
        likes: {
          likeCount: 0,
          likedBy: [],
          dislikedBy: [],
        },
        username: "joweltisso",
        createdAt: formatDate(),
        updatedAt: formatDate(),
      },
      {
        _id: uuid(),
        content:
          "Love the idea behind this. A clear goal and how to achieve it. I believe as you go, you would realize that you need more time with some. And sometimes, I may intend to spend selected hours learning but end up spending more. Wish you the best!👍🏾",
        images: null,
        likes: {
          likeCount: 0,
          likedBy: [],
          dislikedBy: [],
        },
        username: "shubhamsoni",
        createdAt: formatDate(),
        updatedAt: formatDate(),
      },
    ],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
