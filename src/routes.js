
import ProfileGenerator from "views/ProfileGenerator.js";
import SavedResume from "views/SavedResume";

const dashboardRoutes = [
 
  {
    path: "/profile-generator",
    name: "Profile Generator",
    icon: "nc-icon nc-grid-45",
    component: ProfileGenerator,
    layout: "/admin"
  },

  {
    path: "/savedresume",
    name: "Saved Resume",
    icon: "nc-icon nc-single-copy-04",
    component: SavedResume,
    layout: "/admin"
  }
];

export default dashboardRoutes;
