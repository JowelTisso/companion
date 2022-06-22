import { POST } from "../../../utils/axiosHelper";
import { updateUser } from "../../../store/authSlice";
import { callToast } from "../../toast/Toast";
import { API } from "../../../utils/Constant";

export const followUserCall = async (apiType, userId, dispatch) => {
  try {
    const res = await POST(`${apiType}/${userId}`, {});
    if (res?.status === 200 || res?.status === 201) {
      dispatch(updateUser({ user: res?.data?.user }));
      if (apiType === API.FOLLOW_USER) {
        callToast("Followed user successfully!");
      } else {
        callToast("Unfollowed user successfully!");
      }
    }
  } catch (err) {
    console.log(err);
  }
};
