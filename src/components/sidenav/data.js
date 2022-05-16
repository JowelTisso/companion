import {
  TiHomeOutline,
  TiContacts,
  TiImageOutline,
  TiClipboard,
  TiUserOutline,
  TiCogOutline,
} from "react-icons/ti";

export const navList = [
  {
    name: "Home",
    to: "/",
    icon: () => <TiHomeOutline className="t3 nav-icon" />,
  },
  {
    name: "People",
    to: "/",
    icon: () => <TiContacts className="t3 nav-icon" />,
  },
  {
    name: "Photo",
    to: "/",
    icon: () => <TiImageOutline className="t3 nav-icon" />,
  },
  {
    name: "Explore",
    to: "/",
    icon: () => <TiClipboard className="t3 nav-icon" />,
  },
  {
    name: "Profile",
    to: "/",
    icon: () => <TiUserOutline className="t3 nav-icon" />,
  },
  {
    name: "Setting",
    to: "/",
    icon: () => <TiCogOutline className="t3 nav-icon" />,
  },
];
