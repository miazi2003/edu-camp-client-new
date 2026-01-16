
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import UseAxiosSecure from "../hooks/useAxiosSecure";

const GiveMarks = () => {
  const axiosSecure = UseAxiosSecure();
  const { id } = useParams();
  console.log(id);

  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const email = user?.email;
const navigate = useNavigate()
  useEffect(() => {
    axiosSecure
      .get(`https://a-11-server-five.vercel.app/markAssignment/${id}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id , axiosSecure]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const resultMark = e.target.resultMark.value;
    const feedback = e.target.feedback.value;
    const result = { resultMark, feedback, status: "completed" };

    if (resultMark > 100) {
      return toast.error("marks not valid");
    }

    //update marks and status

    axiosSecure
      .put(`https://a-11-server-five.vercel.app/updateAssignmentSubmit/${id}`, {
        result,
        email,
      })
      .then((res) => {
        console.log(res.data);
        toast.success('marked')
        navigate('/assignments')

      })
      .catch((err) => {
        console.log(err.message);
        if (err.response.status === 404) {
          toast.error("assignment not found");
        } else if (err.response.status === 403) {
          toast.error("You Cant Mark Your Own Submit");
        }
      });
  };

  return (
    <div className="assignment min-h-screen">
      <h1 className="text-4xl text-center md:mt-4 text-gray-700 textWhite">
        Give Assignment Mark
      </h1>

      <div className="lg:w-full  w-[350px] mx-auto flex items-center justify-center mt-2">
        <div className="card  w-full  shadow-2xl max-w-sm shrink-0  mt-4">
          <div className="card-body ">
            <p className="text-lg">
              Assignment Id :{" "}
              <span className="text-sm text-gray-500">{data.assignmentId}</span>
            </p>
            <div className="break-words w-full max-w-sm">
              {" "}
              <span className="text-lg">Doc Link : </span>
              <a
                href={data.doc}
                target="_blank"
                className=" text-green-800 underline "
              >
                {data.doc}
              </a>
            </div>
            <p className="mt-2 text-lg">
              {" "}
              Examinee Note :{" "}
              <span className="text-lg text-gray-700">{data.note}</span>
            </p>

            <form onSubmit={handleSubmit}>
              <fieldset className="fieldset">
                <label className="label">Give Mark</label>
                <input
                  type="number"
                  required
                  className="input border-green-800 text "
                  placeholder="Marks 1-100"
                  name="resultMark"
                />
                <label className="label">Feedback</label>
                <textarea
                  type="text"
                  required
                  className="input pt-2 border-green-800 text"
                  placeholder="Feedback"
                  name="feedback"
                />

                <button
                  className="btn bg-green-800 mt-4 text-white hover:bg-white hover:text-green-800 hover:border-green-800 "
                  type="submit"
                >
                  Give Your Marks
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiveMarks;
