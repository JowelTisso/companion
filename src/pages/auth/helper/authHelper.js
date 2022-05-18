import { API } from "../../../utils/Constant";
import { removeToken, setUserToken } from "../../../utils/tokenHelper";
import { POST_AUTH } from "../../../utils/axiosHelper";
import { callToast } from "../../../components/toast/Toast";
import { logOut } from "../../../store/authSlice";

//
export const userLogIn = async (payload) => {
  try {
    const res = await POST_AUTH(API.LOGIN, payload);
    if (res?.status === 200 || res?.status === 201) {
      setUserToken(res?.data.encodedToken);
      callToast("Login successfull!");
    }
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const userLogout = (dispatch) => {
  try {
    removeToken();
    dispatch(logOut());
    callToast("Logged out successfullly!");
  } catch (err) {
    console.log(err);
  }
};

export const userSignUp = async (payload) => {
  try {
    const res = await POST_AUTH(API.SIGNUP, payload);
    if (res?.status === 200 || res?.status === 201) {
      setUserToken(res?.data.encodedToken);
      callToast("Signup successfull! Login to continue!");
    } else {
      callToast("Failed to signup!", false);
    }
    return res;
  } catch (err) {
    console.log(err);
  }
};
