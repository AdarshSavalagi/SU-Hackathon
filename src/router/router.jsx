import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage/Page.jsx";
import NavBar from "../components/NavBar.jsx";
import LoginCard from "../components/Login/LoginCard.jsx";
import Question from "../pages/ExamPage/Question.jsx";
import SuperAdminPage from "../pages/Dashboard/SuperAdmin/SuperAdminPage.jsx";
import FacultyPage from "../pages/Dashboard/Faculty/FacultyPage.jsx";
import StudentPage from "../pages/Dashboard/Student/StudentPage.jsx";
import LogoutPage from "../pages/LogoutPage/LogoutPage.jsx";

export default function RouteHandler() {
  return (
    <>
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* LoginCard */}
          <Route path="/login" element={<LoginCard title="Students Login" type='1' />} />
          <Route path="/flogin" element={<LoginCard title="Faculty Login" type='2' />} />
          <Route path="/slogin" element={<LoginCard title="Admin Login" type='3' />} />


          <Route path="/exam" element={<Question />} />


          {/* dashboards */}
          <Route path="/superadmin" element={<SuperAdminPage />} />
          <Route path="/faculty" element={<FacultyPage />} />
          <Route path="/student" element={<StudentPage />} />


          <Route path="/logout" element={<LogoutPage />} />
        </Routes>
      </Router>
    </>
  );
}
