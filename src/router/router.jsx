import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage/Page.jsx";
import NavBar from "../components/NavBar.jsx";
import LoginCard from "../components/LoginCard.jsx";
import Question from "../pages/Question.jsx";
import SuperAdminPage from "../pages/SuperAdminPage.jsx";
import FacultyPage from "../pages/FacultyPage.jsx";
import StudentPage from "../pages/StudentPage.jsx";
import LogoutPage from "../components/LogoutPage.jsx";

export default function RouteHandler() {
  return (
    <>
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Dynamic props handling for LoginCard */}
          <Route path="/login" element={<LoginCard title="Students Login" />} />
          <Route path="/flogin" element={<LoginCard title="Faculty Login" />} />
          <Route path="/slogin" element={<LoginCard title="Admin Login" />} />

         
          <Route path="/question" element={ <Question /> } />
          <Route path="/superadmin" element={ <SuperAdminPage  /> } />
          <Route path="/faculty" element={ <FacultyPage  /> } />
          <Route path="/student" element={ <StudentPage  /> } />
          <Route path="/logout" element={<LogoutPage/>}/>
        </Routes>
      </Router>
    </>
  );
}
