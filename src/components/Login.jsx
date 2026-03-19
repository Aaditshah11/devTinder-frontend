import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try{
      const res = await axios.post(BASE_URL + "/login", {
        emailId: email,
        password
      }, {withCredentials: true});
      console.log(res);
      dispatch(addUser(res.data));
      return navigate("/");
    }
    catch(err){
      setError(err.response?.data || "Something went wrong.");
    }
}

const handleSignUp = async () => {
  try{
    const res = await axios.post(BASE_URL + "/signup", {
      emailId: email,
      password,
      firstName,
      lastName
    }, {withCredentials: true});
    console.log(res);
    dispatch(addUser(res.data.data));
    return navigate("/profile");
  }
  catch(err){
    setError(err.response?.data || "Something went wrong.");
  }
}

  return (
    <div className="flex justify-center items-center h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl font-bold mb-4">{isLogin ? "Login" : "Sign Up"}</h2>
          
          {!isLogin && <div className="form-control w-full">
            <label className="label">
              <span className="label-text">First Name</span>
            </label>
            <input 
              type="text" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name" 
              className="input input-bordered w-full" 
            />
          </div>}

          {!isLogin && <div className="form-control w-full mt-2">
            <label className="label">
              <span className="label-text">Last Name</span>
            </label>
            <input 
              type="text" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name" 
              className="input input-bordered w-full" 
            />
          </div>}

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email ID</span>
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email" 
              className="input input-bordered w-full" 
            />
          </div>

          <div className="form-control w-full mt-2">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password" 
              className="input input-bordered w-full" 
            />
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center mt-6">
            <button className="btn btn-primary w-full" onClick={isLogin ? handleLogin : handleSignUp}>{isLogin ? "Login" : "Sign Up"}</button>
          </div>
          <div className="card-actions justify-center mt-2 cursor-pointer hover:underline">
            <button onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}</button>
          </div>
          </div>
      </div>
    </div>
  );
};

export default Login;
