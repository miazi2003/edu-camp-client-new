import React, { useContext, useState } from "react";
import Lottie from "lottie-react";
import formLottie from "../../../assets/lottie/forms.json";
import { AuthContext } from "../../../Context/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
const CreateAssignment = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = useContext(AuthContext);
  const [dueDate, setDueDate] = useState(null);
const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const assignment = Object.fromEntries(formData.entries());
    console.log(assignment);

    const newAssignment = {
      email: user?.email,

      ...assignment,
    };

    console.log(newAssignment);


    const {description } = assignment
    if(description.length < 70 ){
      return toast.error('short')
    }

    //post data to the server

    axiosSecure
      .post("/createAssignment ", newAssignment)
      .then((res) => {
        console.log("post assignment", res.data);
        toast.success("Assignment Created Successfully")
        navigate("/assignments")
      }).catch(err=>{console.log(err)
        toast.error(err.message)
      })
  };

  return (
    <div>
      <div className="md:flex md:items-center  min-h-screen">
        <div className="font lg:px-12 p-4 h-full md:w-[50%] bg-white  mt-2 lg:ml-8 rounded-2xl assignment ">
          <h1 className="text-3xl text-center text-gray-500 textWhite md:mb-4 mb-6">
            Assignment Form
          </h1>
          <form className="flex  lg:p-4 gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-14 w-max ">
              <div className="flex gap-2">
                <label className="text-gray-500">Title :</label>
              </div>
              <div className="flex gap-2">
                <label className="text-gray-500">Marks :</label>
              </div>
              <div className="flex gap-2">
                <label className="text-gray-500">Thumbnail :</label>
              </div>
              <div className="flex gap-2">
                <label className="text-gray-500">Description:</label>
              </div>
              <div className="flex gap-2">
                <label className="text-gray-500">Deadline :</label>
              </div>
              <div className="flex gap-2">
                <label className="text-gray-500">Difficulty :</label>
              </div>
            </div>

            <div className="flex flex-col gap-8 w-full">
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="border border-green-800 p-2  rounded-xl"
              />
              <input
                type="number"
                name="marks"
                placeholder="Marks 1-100"
                className="border p-2 border-green-800 rounded-xl"
              />{" "}
              <input
                type="url"
                name="thumbnailImageURL"
                placeholder="Thumbnail"
                className="border p-2 border-green-800  rounded-xl"
              />{" "}
              <textarea
                type="text"
                name="description"
                className="border p-2 border-green-800 rounded-xl"
              />{" "}
                  
      <DatePicker
        selected={dueDate}
        onChange={(date) => setDueDate(date)}
        dateFormat="yyyy-MM-dd"
        placeholderText="Select a due date"
        className="border p-2 border-green-800 rounded-xl z-40"
      />
              <div className=" flex-col  md:flex md:flex-row md:justify-between items-center">
                <select
                  name="difficulty"
                  id=""
                  className="border border-green-800 mt-2 w-max h-8 mr-4"
                >
                  <option defaultValue="Set A Difficulty">
                    Set A Difficulty
                  </option>
                  <option value="Easy">Easy</option>
                  <option value="Normal">Normal</option>
                  <option value="Hard">Hard</option>
                </select>
                <div className="w-full flex items-center justify-center text-center md:mt-0 mt-4">
                  <button
                    type="submit"
                    className="btn h-10 bg-green-800 hover:bg-white hover:text-green-800 hover:border-green-800  text-white duration-300"
                  >
                    Create Assignment
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="lottie md:flex   hidden flex-col  items-center justify-center w-[50%]">
          <h1 className="text-5xl text-green-800 ">
            EduCamp <span className="text-gray-500 textWhite">Web</span>
          </h1>
          <p className="text-lg text-gray-500 mt-2 font">
            Create Your Assignment Here
          </p>
          <Lottie
            style={{ width: "400px" }}
            animationData={formLottie}
          ></Lottie>
        </div>
      </div>
    </div>
  );
};

export default CreateAssignment;
