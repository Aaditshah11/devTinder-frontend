import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("musk@gmail.com");
  const [password, setPassword] = useState("Elon@123");
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      console.log(err);
    }
}

  return (
    <div className="flex justify-center items-center h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl font-bold mb-4">Login</h2>
          
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

          <div className="card-actions justify-center mt-6">
            <button className="btn btn-primary w-full" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
