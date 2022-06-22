import { TiHomeOutline, TiUserOutline } from "react-icons/ti";
import { IoBookmarkOutline, IoRocketOutline } from "react-icons/io5";
import { ROUTES } from "../../utils/Constant";

export const navList = [
  {
    name: "Home",
    to: ROUTES.HOME,
    icon: (currentRoute) => (
      <TiHomeOutline
        className="t3"
        color={currentRoute === ROUTES.HOME ? "#048434" : "gray"}
      />
    ),
  },
  {
    name: "Explore  ",
    to: ROUTES.EXPLORE,
    icon: (currentRoute) => (
      <IoRocketOutline
        className="t3"
        color={currentRoute === ROUTES.EXPLORE ? "#048434" : "gray"}
      />
    ),
  },
  {
    name: "Bookmarks",
    to: ROUTES.BOOKMARK,
    icon: (currentRoute) => (
      <IoBookmarkOutline
        className="t3"
        color={currentRoute === ROUTES.BOOKMARK ? "#048434" : "gray"}
      />
    ),
  },
  {
    name: "Profile",
    to: ROUTES.PROFILE,
    icon: (currentRoute) => (
      <TiUserOutline
        className="t3"
        color={currentRoute === ROUTES.PROFILE ? "#048434" : "gray"}
      />
    ),
  },
];
