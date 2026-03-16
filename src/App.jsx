import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { addUser } from "./utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try{
      const res = await axios.get(BASE_URL + "/profile/view", {withCredentials: true});
      dispatch(addUser(res.data));
    }
    catch(err){
     if(err.response?.status === 401) navigate("/login"); 
     console.error(err);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Body />}>
        <Route path="/" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
