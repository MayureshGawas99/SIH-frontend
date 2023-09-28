import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ChatPage from "./pages/ChatPage";
import Header from "./components/layout/Header";
import PagenotFound from "./pages/PagenotFound";
import ProfileModal from "./components/miscellaneous/ProfileModal";
import { Login } from "./components/Authentication/Login/Login";
import { Signup } from "./components/Authentication/Login/Signup";
import Aboutpage from "./pages/Aboutpage";
import ContactUsPage from "./pages/ContactUsPage";
import ProjectUpload from "./components/ProjectUpload";
import ProfilePage from "./components/UserProfile/profile-page";
import { ChatState } from "./Context/ChatProvider";
import Home from "./pages/Home";
import Chatpage from "./pages/ChatPage";
import AllProjects from "./pages/AllProjects";
import ProjectUpdate from "./components/ProjectUpdate";
import UpdateProfile from "./components/UserProfile/UpdateProfile";
import ProjectProfile from "./components/ProjectProfile";

function App() {
  const { user } = ChatState();

  return (
    <>
      <Header />
      <div className="App scrollY">
        {user ? (
          <div className="row h-100 w-100 scrollY">
            <div className="col-md-9 h-100 scrollY">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/project-upload" element={<ProjectUpload />} />
                <Route path="/project-update" element={<ProjectUpdate />} />
                <Route path="/project-view" element={<ProjectProfile />} />
                <Route path="/projects" element={<AllProjects />} />
                <Route path="/profile-update" element={<UpdateProfile />} />
                <Route path="/profile" element={<ProfilePage />} />
                {/* <Route path="/networks" element={<ProfilePage />} /> */}
                <Route path="/about" element={<Aboutpage />} />
                <Route path="/contact" element={<ContactUsPage />} />
                <Route path="/*" element={<PagenotFound />} />
              </Routes>
            </div>
            <div className="col-md-3 border-start">
              <Chatpage />
            </div>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* <Route path="/project-upload" element={<ProjectUpload />} /> */}
            {/* <Route path="/profile" element={<ProfileModal />} /> */}
            {/* <Route path="/networks" element={<ProfilePage />} /> */}
            <Route path="/about" element={<Aboutpage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/*" element={<PagenotFound />} />
          </Routes>
        )}
      </div>
    </>
  );
}

export default App;
