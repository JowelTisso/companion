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
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
