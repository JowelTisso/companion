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

const EditModal = () => {
  const {
    userProfile: {
      avatar,
      firstName,
      lastName,
      username,
      bio,
      website,
      backgroundImg,
      _id: userProfileId,
    },
  } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  const [profileData, setProfileData] = useState({
    avatar: "",
    firstName: "",
    lastName: "",
    username: "",
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
    username: {
      error: false,
      msg: "",
    },
  });

  const onChange = (type, { target }) => {
    setProfileData((data) => ({ ...data, [type]: target.value }));
  };

  const onSubmit = async () => {
    if (profileData.firstName && profileData.lastName && profileData.username) {
      setFormValidation((data) => ({
        ...data,
        firstName: { error: false, msg: "" },
        lastName: { error: false, msg: "" },
        username: { error: false, msg: "" },
      }));
      console.log(profileData);
      const res = await POST(API.EDIT_USER, { userData: profileData });
      if (res?.status === 200 || res?.status === 201) {
        dispatch(updateUser({ user: res?.data?.user }));
        dispatch(getUser(userProfileId));
        dispatch(toggleEditProfileModal());
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
    if (!profileData.username) {
      setFormValidation((data) => ({
        ...data,
        username: { error: true, msg: "This is required!" },
      }));
    }
  };

  const uploadHandler = async ({ target }) => {
    const res = await uploadImages(target.files);
    setProfileData((data) => ({ ...data, avatar: res.secure_url }));
  };

  useEffect(() => {
    setProfileData({
      avatar,
      firstName,
      lastName,
      username,
      bio,
      website,
      backgroundImg,
    });
  }, []);

  return (
    <div className="edit-profile-container">
      <div
        className="profile-banner"
        style={{
          backgroundImage: `url(${backgroundImg})`,
        }}
      >
        <span className="profile-img ">
          <div className="badge-container">
            <Avatar
              sx={{ width: 120, height: 120 }}
              src={avatar}
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
            className="name-field"
            value={profileData.firstName}
            onChange={(e) => onChange("firstName", e)}
          />
          <TextField
            error={formValidation.lastName.error}
            helperText={formValidation.lastName.msg}
            id="outlined-basic"
            label="Last name"
            variant="outlined"
            className="name-field"
            value={profileData.lastName}
            onChange={(e) => onChange("lastName", e)}
          />
        </div>
        <TextField
          error={formValidation.username.error}
          helperText={formValidation.username.msg}
          id="outlined-basic"
          label="Username"
          variant="outlined"
          value={profileData.username}
          onChange={(e) => onChange("username", e)}
        />
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
    </div>
  );
};

export default EditModal;
