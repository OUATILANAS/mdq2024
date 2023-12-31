import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-kit.scss";
import "assets/demo/demo.css";
import AuthService from "./services/auth.service";
import Index from "views/Index.js";
import NucleoIcons from "views/NucleoIcons.js";
import LandingPage from "views/examples/LandingPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import RegisterPage from "views/examples/RegisterPage.js";
import LoginPage from "views/examples/LoginPage";
import Blogs from "views/examples/Blogs";
import Blog from "views/examples/Blog";
import AddBlog from "views/examples/crud/AddBlog";
import MyBlogs from "views/examples/MyBlogs";
import EditBlog from "views/examples/crud/EditBlog";

import Dashboard from "views/Admin/Dashboard";
import Employee from "layouts/Employee";
import AdminLayout from "layouts/Admin";

import Story from "views/Admin/Story";
import UserComponent from "views/Admin/Users";
import Comment from "views/Admin/Comment";
import AddComment from "views/Admin/CRUD/AddComment";
import AddStory from "views/Admin/CRUD/AddStory";
import EditComment from "views/Admin/CRUD/EditComment";
import Logout from "views/examples/LogOut";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined,
      isAdmin: false,
      isDirector: false,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        isAdmin: user.roles.includes("ROLE_ADMIN"),
        isDirector: user.roles.includes("ROLE_USER")
      });
    }
  }

  render() {
    const { currentUser, isAdmin, isDirector } = this.state;

    return (
      <div>
        <Routes>
          <Route path="/" element={currentUser ? <LandingPage /> : <LandingPage />} />
          <Route path="/admin/dashboard" element={isAdmin ? <Dashboard /> : <Index />} />
          <Route path="/admin/comment" element={isAdmin ? <Comment /> : <Index />} />
          <Route path="/admin/story" element={isAdmin ? <Story /> : <Index />} />
          <Route path="/admin/user" element={isAdmin ? <UserComponent /> : <Index />} />
          <Route path="/admin/addcomment" element={isAdmin ? <AddComment /> : <Index />} />
          <Route path="/admin/editcomment" element={isAdmin ? <EditComment /> : <Index />} />
          <Route path="/admin/addstory" element={isAdmin ? <AddStory /> : <Index />} />
          <Route path="/login-page" element={<LoginPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register-page" element={<RegisterPage />} />
          <Route path="/index" element={<Index />} />
          <Route path="/nucleo-icons" element={<NucleoIcons />} />
          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/blogs-page" element={<Blogs />} />
          <Route path="/myblogs" element={<MyBlogs />} />
          <Route path="/blog/:idB" element={<Blog />} />
          <Route path="/edit-blog/:idB" element={<EditBlog />} />
          <Route path="/add-blog" element={<AddBlog />} />
          <Route path="/profile-page" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/landing-page" replace />} />
        </Routes>
      </div>
    );
  }
}

export default App;
