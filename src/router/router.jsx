import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {HomePage} from "../pages/HomePage/Page.jsx";
import {NavBar} from "../components/NavBar.jsx";



export default  function RouteHandler(){
    return (
        <>
            <NavBar/>
  <Router>
      <Routes>
          <Route path={''} element={<HomePage/>}/>
      </Routes>
  </Router>
        </>
    )
}