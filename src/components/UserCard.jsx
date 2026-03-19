import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user, isView }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed({_id}));
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="card bg-base-300 w-96 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-base-200">
      <figure className="relative pt-4 px-4 w-full h-80 overflow-hidden">
        <img
          src={photoUrl || "https://vectorified.com/images/no-profile-picture-icon-24.jpg"}
          alt="photo"
          className="rounded-xl w-full h-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold">
          {firstName} {lastName !== "" && lastName}
        </h2>
        {age && gender && (
          <p className="text-sm font-semibold text-base-content/70">
            {age}, <span className="capitalize">{gender}</span>
          </p>
        )}
        <p className="text-base-content/80 text-sm mt-2 line-clamp-3 leading-relaxed min-h-[4rem]">
          {about}
        </p>
        <div className="card-actions justify-center my-4 w-full flex-nowrap gap-4">
          <button className="btn btn-outline btn-error hover:bg-error hover:text-white rounded-full flex-1" onClick={() => handleSendRequest("ignored", user._id)} disabled={isView} >
            Ignore
          </button>
          <button className="btn btn-outline btn-success hover:bg-success hover:text-white rounded-full flex-1" onClick={() => handleSendRequest("interested", user._id)} disabled={isView}>
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserCard;