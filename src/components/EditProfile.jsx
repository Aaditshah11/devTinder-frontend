import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    //Clear Errors
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="flex flex-col xl:flex-row justify-center items-center xl:items-start gap-10 my-10 max-w-6xl mx-auto px-4">
        <div className="card bg-base-200 w-full max-w-md shadow-2xl border border-base-300">
          <div className="card-body">
            <h2 className="card-title text-3xl font-extrabold justify-center text-primary mb-6">
              Edit Profile
            </h2>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold">First Name</span>
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full focus:input-primary transition-colors"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold">Last Name</span>
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full focus:input-primary transition-colors"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Photo URL</span>
                </label>
                <input
                  type="text"
                  value={photoUrl}
                  className="input input-bordered w-full focus:input-primary transition-colors"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="form-control w-full sm:w-1/3">
                  <label className="label">
                    <span className="label-text font-semibold">Age</span>
                  </label>
                  <input
                    type="number"
                    value={age}
                    className="input input-bordered w-full focus:input-primary transition-colors"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>

                <div className="form-control w-full sm:w-2/3">
                  <label className="label">
                    <span className="label-text font-semibold">Gender</span>
                  </label>
                  <select
                    className="select select-bordered w-full focus:select-primary transition-colors"
                    value={gender || ""}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option disabled value="">Select Gender...</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">About Me</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-28 w-full focus:textarea-primary transition-colors resize-none"
                  placeholder="A short bio"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>
            </div>
            
            {error && <p className="text-error font-medium mt-4 text-center">{error}</p>}
            
            <div className="card-actions justify-center mt-6">
              <button 
                className="btn btn-primary w-full shadow-lg hover:shadow-xl rounded-full" 
                onClick={saveProfile}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <UserCard
            user={{ firstName, lastName, photoUrl, age, gender, about }}
          />
        </div>
      </div>
      
      {showToast && (
        <div className="toast toast-top toast-center z-50 mt-10">
          <div className="alert alert-success shadow-lg text-white font-bold rounded-xl">
            <span>Profile saved successfully!</span>
          </div>
        </div>
      )}
    </>
  );
};
export default EditProfile;