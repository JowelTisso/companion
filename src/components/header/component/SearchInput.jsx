import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { Autocomplete, Avatar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser, getUserPosts } from "../../../store/profileSlice";
import { ROUTES } from "../../../utils/Constant";
import { Color } from "../../../utils/Color";

const SearchInput = ({ showSearch }) => {
  const { allUsers } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigateTo = (user) => {
    dispatch(getUser(user._id));
    dispatch(getUserPosts(user.username));
    navigate(ROUTES.PROFILE);
  };

  const ItemOption = ({ props, option }) => {
    return (
      <li {...props} key={option._id} className="item-user pd-2x ">
        <Avatar
          sx={{ width: 50, height: 50 }}
          src={option.avatar}
          alt="profile avatar"
          className=" pointer"
          onClick={() => navigateTo(option)}
        />
        <div className="pd-left-2x">
          <p
            className="t4 username txt-overflow pointer"
            onClick={() => navigateTo(option)}
          >
            {option.firstName} {option.lastName}
          </p>
          <p className="t4 userid txt-overflow">@{option.username}</p>
        </div>
      </li>
    );
  };

  const ItemInput = ({ params }) => (
    <div ref={params.InputProps.ref}>
      <input
        type="text"
        {...params.inputProps}
        className={`input-simple ${showSearch ? "show-search" : "hide-search"}`}
        placeholder="Search"
      />
    </div>
  );

  return (
    <div className="input-container search-icon-container">
      <IoSearchOutline className="search-icon" />
      <Autocomplete
        id="free-solo-demo"
        options={allUsers}
        renderInput={(params) => <ItemInput params={params} />}
        getOptionLabel={(option) => option.username}
        renderOption={(props, option, state) => (
          <ItemOption props={props} option={option} />
        )}
      />
    </div>
  );
};

export default SearchInput;
