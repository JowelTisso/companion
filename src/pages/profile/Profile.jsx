import "./Profile.css";
import React, { useEffect, useState } from "react";
import { Avatar, Button, Link } from "@mui/material";
import { API } from "../../utils/Constant";
import { GET } from "../../utils/axiosHelper";
import UserPost from "../../components/userpost/UserPost";
import { useSelector } from "react-redux";

const Profile = () => {
  const [userPosts, setUserPosts] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      try {
        const res = await GET(`${API.USER_POST}/${"joweltisso"}`);
        if (res?.status === 200 || res?.status === 201) {
          setUserPosts(res?.data.posts);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className="home-wrapper">
      <main className="user-info-section">
        <div className="profile-banner mg-top-1x">
          <span className="profile-img pointer">
            <Avatar
              sx={{ width: 120, height: 120 }}
              src="https://i.pravatar.cc/150?img=60"
              alt="profile avatar"
            />
          </span>
        </div>
        <div className="edit-btn mg-1x">
          <Button
            variant="outlined"
            sx={{
              border: "2px solid #424b54",
              color: "#424b54",
              borderRadius: 5,
            }}
          >
            Edit profile
          </Button>
        </div>
        <div className="mg-top-5x mg-left-2x user-info">
          <p className="t3 username">Jowel Tisso</p>
          <p className="t3 userid">@joweltisso</p>
        </div>
        <p className="t4 mg-left-2x mg-top-1x">
          Time to level up | Aspiring neograd22 | React | React Native |
          Learning with @neogcamp
        </p>
        <span className="mg-left-2x website-link">
          <Link
            href="https://github.com/JowelTisso"
            underline="none"
            color="#2196f3"
            fontSize={14}
            target="_blank"
          >
            https://github.com/JowelTisso
          </Link>
        </span>
        <div className="follower-container mg-left-2x mg-top-2x">
          <p className="t4">
            <b className="follower-count">200</b> Followers
          </p>
          <p className="t4">
            <b className="follower-count">320</b> Following
          </p>
        </div>
      </main>
      <section className="user-posts-section pd-1x">
        <p className="t3 section-title mg-left-1x mg-top-2x">Your posts</p>
        <main className="mg-top-2x">
          {userPosts?.length > 0 ? (
            userPosts?.map((post) => (
              <UserPost {...post} key={post._id} user={user} />
            ))
          ) : (
            <p className="t4">You have not created any post!</p>
          )}
        </main>
      </section>
    </div>
  );
};

export default Profile;
