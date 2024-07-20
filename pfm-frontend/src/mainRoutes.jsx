import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import HomePage from "./Pages/HomePage";
import SignIn from "./Pages/SignIn";

const mainRoutes = () => {
  return (
    <div>
      <Router>
        <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Router>
    </div>
  )
}

export default mainRoutes