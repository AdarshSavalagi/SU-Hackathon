import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage/Page.jsx";
import NavBar from "../components/NavBar.jsx";
import LoginCard from "../components/LoginCard.jsx";
import Question from "../pages/Question.jsx";

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

         
          <Route
            path="/question"
            element={
              <Question 
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}
