import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/conectionSlice";
import { Link, useNavigate } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
      if (err.response?.status === 401) navigate("/login");
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections)
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );

  if (connections.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="bg-base-200 p-8 rounded-2xl shadow-sm text-center max-w-md w-full border border-base-300">
          <div className="text-6xl mb-4">🤝</div>
          <h1 className="text-2xl font-bold text-base-content mb-2">
            No Connections Yet
          </h1>
          <p className="text-base-content/70">
            Start swiping and engaging to build your network!
          </p>
        </div>
      </div>
    );

  return (
    <div className="my-10 px-4 max-w-4xl mx-auto flex flex-col items-center">
      <div className="mb-8 text-center">
        <h1 className="font-extrabold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">
          Your Connections
        </h1>
        <p className="text-base-content/70">People who have matched with you</p>
      </div>

      <div className="w-full space-y-4 flex flex-col items-center">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            connection;

          return (
            <div
              key={_id || firstName}
              className="flex flex-col sm:flex-row items-center sm:items-start p-6 rounded-2xl bg-base-200 w-full max-w-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-base-300 hover:border-primary/30 group"
            >
              <div className="relative mb-4 sm:mb-0 flex-shrink-0">
                <img
                  alt={`${firstName}'s photo`}
                  className="w-24 h-24 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-base-100 group-hover:border-primary/50 transition-colors duration-300 shadow-sm"
                  src={
                    photoUrl ||
                    "https://vectorified.com/images/no-profile-picture-icon-24.jpg"
                  }
                />
              </div>
              <div className="text-center sm:text-left sm:ml-6 flex-1">
                <h2 className="font-bold text-2xl sm:text-xl text-base-content mb-1 group-hover:text-primary transition-colors">
                  {firstName}
                </h2>
                {lastName !== "" && (
                  <h2 className="font-bold text-2xl sm:text-xl text-base-content mb-1 group-hover:text-primary transition-colors">
                    {lastName}
                  </h2>
                )}
                {(age || gender) && (
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-base-content/70 font-medium mb-3">
                    {age && (
                      <span className="bg-base-300 px-2 py-1 rounded-md">
                        {age} yrs
                      </span>
                    )}
                    {gender && (
                      <span className="bg-base-300 px-2 py-1 rounded-md capitalize">
                        {gender}
                      </span>
                    )}
                  </div>
                )}
                <p className="text-base-content/80 text-sm leading-relaxed line-clamp-3 sm:line-clamp-2">
                  {about || "Hey there! I am using DevTinder."}
                </p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-4 flex items-center justify-center shrink-0 w-full sm:w-auto self-center">
                <Link to={`/chat/${_id}`}>
                  <button className="btn btn-primary rounded-full px-6 shadow-md hover:shadow-lg w-full sm:w-auto">
                    Message
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Connections;
