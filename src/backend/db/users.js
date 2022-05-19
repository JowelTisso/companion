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
    avatar: "https://i.pravatar.cc/150?img=60",
    bookmarks: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Son",
    lastName: "Goku",
    username: "songoku",
    password: "goku",
    avatar: "https://i.pravatar.cc/150?img=54",
    bookmarks: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "yu",
    lastName: "zhong",
    username: "yuzhong",
    password: "yuzhong",
    avatar: "https://i.pravatar.cc/150?img=40",
    bookmarks: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "prince",
    lastName: "vegeta",
    username: "vegeta",
    password: "vegeta",
    avatar: "https://i.pravatar.cc/150?img=31",
    bookmarks: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
