import axios from "axios";
import { getUserToken } from "./tokenHelper";

/**
 * @param url This is the url you want to fetch.
 * @param auth If the url requires authentication then pass as true or pass as false. Default is false.
 */
export const GET = async (url, auth = false) => {
  try {
    if (auth) {
      return await axios.get(url, {
        headers: { authorization: getUserToken() },
      });
    } else {
      return await axios.get(url);
    }
  } catch (err) {
    console.log(err);
  }
};

/**
 * @param url This is the url you want to post request to.
 * @param body This the body object you need to send, varies according to the api.
 */
export const POST = async (url, body) => {
  try {
    return await axios.post(url, body, {
      headers: { authorization: getUserToken() },
    });
  } catch (err) {
    console.log(err);
  }
};

/**
 * This method is for the authentication process
 * @param url This is login or signup url.
 * @param body This the body object you need to send, varies according to the api.
 */
export const POST_AUTH = async (url, body) => {
  try {
    return await axios.post(url, body);
  } catch (err) {
    console.log(err);
  }
};

/**
 * This method is for the authentication process
 * @param url This is login or signup url.
 * @param body This the body object you need to send, varies according to the api.
 */
export const DELETE = async (url, body) => {
  try {
    return await axios.delete(url, body, {
      headers: { authorization: getUserToken() },
    });
  } catch (err) {
    console.log(err);
  }
};
