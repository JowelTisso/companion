import { TiHomeOutline, TiUserOutline } from "react-icons/ti";
import { IoBookmarkOutline, IoRocketOutline } from "react-icons/io5";
import { ROUTES } from "../../utils/Constant";
import { Color } from "../../utils/Color";

export const navList = [
  {
    name: "Home",
    to: ROUTES.HOME,
    icon: (currentRoute) => (
      <TiHomeOutline
        className="t3"
        color={currentRoute === ROUTES.HOME ? Color.primary : "gray"}
      />
    ),
  },
  {
    name: "Explore  ",
    to: ROUTES.EXPLORE,
    icon: (currentRoute) => (
      <IoRocketOutline
        className="t3"
        color={currentRoute === ROUTES.EXPLORE ? Color.primary : "gray"}
      />
    ),
  },
  {
    name: "Bookmarks",
    to: ROUTES.BOOKMARK,
    icon: (currentRoute) => (
      <IoBookmarkOutline
        className="t3"
        color={currentRoute === ROUTES.BOOKMARK ? Color.primary : "gray"}
      />
    ),
  },
  {
    name: "Profile",
    to: ROUTES.PROFILE,
    icon: (currentRoute) => (
      <TiUserOutline
        className="t3"
        color={currentRoute === ROUTES.PROFILE ? Color.primary : "gray"}
      />
    ),
  },
];
