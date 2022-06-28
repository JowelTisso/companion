import "./EditModal.css";
import React, { useEffect, useState } from "react";
import { Avatar, Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { POST } from "../../../utils/axiosHelper";
import { API } from "../../../utils/Constant";
import { updateUser } from "../../../store/authSlice";
import { callToast } from "../../../components/toast/Toast";
import { getUser, toggleEditProfileModal } from "../../../store/profileSlice";
import { MdModeEdit } from "react-icons/md";
import { uploadImages } from "./service";
import { loadPosts } from "../../../store/postSlice";
import { loadAllUsers } from "../../../store/homeSlice";
import Spinner from "../../../components/spinner/Spinner";

const EditModal = () => {
  const {
    userProfile: {
      avatar,
      firstName,
      lastName,
      bio,
      website,
      backgroundImg,
      _id: userProfileId,
    },
  } = useSelector((state) => state.profile);
  const { mode } = useSelector((state) => state.theme);

  const defaultBackgroundImg = "https://picsum.photos/id/10/1000/500";

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    avatar: avatar || "",
    firstName: "",
    lastName: "",
    bio: "",
    website: "",
    backgroundImg: "",
  });

  const [formValidation, setFormValidation] = useState({
    firstName: {
      error: false,
      msg: "",
    },
    lastName: {
      error: false,
      msg: "",
    },
    website: {
      error: false,
      msg: "",
    },
  });

  const onChange = (type, { target }) => {
    setProfileData((data) => ({ ...data, [type]: target.value }));
  };

  const onSubmit = async () => {
    try {
      if (profileData.firstName && profileData.lastName) {
        if (!profileData.website.includes(".com")) {
          setFormValidation((data) => ({
            ...data,
            website: { error: true, msg: "Input a valid website!" },
          }));
          return;
        }
        setFormValidation((data) => ({
          ...data,
          firstName: { error: false, msg: "" },
          lastName: { error: false, msg: "" },
          website: { error: false, msg: "" },
        }));
        const res = await POST(API.EDIT_USER, { userData: profileData });
        if (res?.status === 200 || res?.status === 201) {
          dispatch(updateUser({ user: res?.data?.user }));
          dispatch(getUser(userProfileId));
          dispatch(toggleEditProfileModal());
          dispatch(loadPosts());
          dispatch(loadAllUsers());
          callToast("Your profile has been updated successfully!");
        } else {
          callToast("Unable to update profile!", false);
        }
      }
      if (!profileData.firstName) {
        setFormValidation((data) => ({
          ...data,
          firstName: { error: true, msg: "This is required!" },
        }));
      }
      if (!profileData.lastName) {
        setFormValidation((data) => ({
          ...data,
          lastName: { error: true, msg: "This is required!" },
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const uploadHandler = async ({ target }) => {
    setLoading(true);
    const res = await uploadImages(target.files);
    setProfileData((data) => ({ ...data, avatar: res.secure_url }));
    setLoading(false);
  };

  useEffect(() => {
    setProfileData({
      avatar,
      firstName,
      lastName,
      bio,
      website,
      backgroundImg,
    });
  }, []);

  return (
    <div
      className={`edit-profile-container ${
        mode === "dark" && "container-darkmode"
      }`}
    >
      <div
        className="profile-banner"
        style={{
          backgroundImage: `url(${backgroundImg || defaultBackgroundImg})`,
        }}
      >
        <span className="profile-img ">
          <div className="badge-container">
            <Avatar
              sx={{ width: 120, height: 120 }}
              src={profileData.avatar}
              alt="profile avatar"
            />
            <label htmlFor="profilePic">
              <MdModeEdit className="badge bdg-l bdg-b pointer" />
            </label>
          </div>
        </span>

        <input
          type="file"
          accept="image/*"
          multiple={false}
          className="file-chooser"
          id="profilePic"
          onChange={uploadHandler}
        />
      </div>
      <div className="field-container pd-2x">
        <div className="field-name">
          <TextField
            error={formValidation.firstName.error}
            helperText={formValidation.firstName.msg}
            id="outlined-basic"
            label="First name"
            variant="outlined"
            className="txt-field"
            value={profileData.firstName}
            onChange={(e) => onChange("firstName", e)}
          />
          <TextField
            error={formValidation.lastName.error}
            helperText={formValidation.lastName.msg}
            id="outlined-basic"
            label="Last name"
            variant="outlined"
            className="txt-field"
            value={profileData.lastName}
            onChange={(e) => onChange("lastName", e)}
          />
        </div>
        <TextField
          id="filled-multiline-flexible"
          label="Bio"
          multiline
          minRows={2}
          maxRows={4}
          variant="outlined"
          value={profileData.bio}
          onChange={(e) => onChange("bio", e)}
        />
        <TextField
          error={formValidation.website.error}
          helperText={formValidation.website.msg}
          id="outlined-basic"
          label="Website"
          variant="outlined"
          value={profileData.website}
          onChange={(e) => onChange("website", e)}
        />
      </div>
      <div className="save-btn-container mg-bottom-2x">
        <Button
          variant="contained"
          sx={{
            borderRadius: 5,
          }}
          onClick={onSubmit}
        >
          Save
        </Button>
      </div>
      {loading && <Spinner loading={loading} />}
    </div>
  );
};

export default EditModal;
