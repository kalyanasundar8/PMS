import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import HomePage from "./Pages/HomePage";

const mainRoutes = () => {
  return (
    <div>
      <Router>
        <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  )
}

export default mainRoutes
