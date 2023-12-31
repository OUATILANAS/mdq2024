
import Comment from "views/Admin/Comment";
import AddComment from "views/Admin/CRUD/AddComment";
import EditComment from "views/Admin/CRUD/EditComment";
import Story from "views/Admin/Story";
import AddStory from "views/Admin/CRUD/AddStory";
import UserComponent from "views/Admin/Users";
import Dashboard from "layouts/Admin";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/Comment",
    name: "Comment",
    icon: "nc-icon nc-bank",
    component: <Comment />,
    layout: "/admin",
  },
  {
    path: "/story",
    name: "Story",
    icon: "nc-icon nc-vector",
    component: <Story />,
    layout: "/admin",
  },
  
 
  {
    path: "/user",
    name: "User",
    icon: "nc-icon nc-badge",
    component: <UserComponent />,
    layout: "/admin",
  },
  
  
  
  {
    path: "/addcomment",
    component: <AddComment />,
    layout: "/admin",
  },
  {
    path: "/addstory",
    component: <AddStory />,
    layout: "/admin",
  },
  
  
  {
    path: "/editcomment/:idB",
    component: <EditComment />,
    layout: "/admin",
  },
  
  
 
];
export default routes;
