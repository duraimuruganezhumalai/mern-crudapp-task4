import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [studentForm, setStudentForm] = useState({
    studentname: "",
    email: "",
    course: "",
    city: "",
  });

  const [getData, setGetData] = useState([]);

  const [editId, SetEditId] = useState(null);

  const handleStudentInput = (e) => {
    setStudentForm({ ...studentForm, [e.target.name]: e.target.value });
  };

  const getStudentData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students");
      setGetData(res.data.getStudentData);
      console.log("get student data", res.data.getStudentData);
    } catch (error) {
      console.log("Error", error);
      alert(error.response.data.msg);
    }
  };

  useEffect(() => {
    getStudentData();
  }, []);

  const handleStudentForm = async (e) => {
    try {
      e.preventDefault();

      const res = await axios.post(
        "http://localhost:5000/api/students",
        studentForm,
      );

      alert("successfully added");
      console.log("postStudentData", res);

      setStudentForm({
        studentname: "",
        email: "",
        course: "",
        city: "",
      });
      getStudentData();
    } catch (error) {
      console.log("Error", error);
      alert(error.response.data.msg);
    }
  };

  const handleStudentEdit = (user) => {
    setStudentForm(user);
    SetEditId(user._id);
  };

  const handleUpdateStudentData = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:5000/api/students/${editId}`,
        studentForm,
      );
     
      setStudentForm({
        studentname: "",
        email: "",
        course: "",
        city: "",
      });
      SetEditId(null);
      getStudentData();
    } catch (error) {
      console.log("Error", error);
         alert(error.response.data.msg);
    }
  };


const handleStudentDelete = async (userId) =>{

  try {
      const res = await axios.delete(`http://localhost:5000/api/students/${userId}`)
      getStudentData();
      alert(res.data.msg)
  } 
  
  catch (error) {
    console.log("Error", error);
      alert(error.response.data.msg);
  }

}


  return (
    <>
      <section>
        <form onSubmit={handleStudentForm} className="py-8">
          <div className="space-y-4 max-w-sm mx-auto">
            {/* <h1>Student Form</h1> */}
            <div>
              <label
                htmlFor="studentname"
                className="mb-2 text-slate-900 dark:text-slate-50 font-medium text-sm inline-block"
              >
                Student Name
              </label>
              <input
                type="text"
                id="studentname"
                name="studentname"
                placeholder="john"
                onChange={handleStudentInput}
                value={studentForm.studentname}
                className="px-3 py-2.5 text-sm text-slate-900 dark:text-slate-50 rounded-md bg-white dark:bg-neutral-800 w-full outline-1 -outline-offset-1 outline-slate-300 dark:outline-neutral-700 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-slate-900 dark:text-slate-50 font-medium text-sm "
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="john@gmail.com"
                onChange={handleStudentInput}
                value={studentForm.email}
                className="px-3 py-2.5 text-sm text-slate-900 dark:text-slate-50 rounded-md bg-white dark:bg-neutral-800 w-full outline-1 -outline-offset-1 outline-slate-300 dark:outline-neutral-700 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
              />
            </div>
            <div>
              <label
                htmlFor="course"
                className="mb-2 text-slate-900 dark:text-slate-50 font-medium text-sm inline-block"
              >
                Course
              </label>
              <input
                type="text"
                id="course"
                name="course"
                placeholder="course"
                onChange={handleStudentInput}
                value={studentForm.course}
                className="px-3 py-2.5 text-sm text-slate-900 dark:text-slate-50 rounded-md bg-white dark:bg-neutral-800 w-full outline-1 -outline-offset-1 outline-slate-300 dark:outline-neutral-700 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
              />
            </div>
            <div>
              <label
                htmlFor="city"
                className="mb-2 text-slate-900 dark:text-slate-50 font-medium text-sm inline-block"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="city"
                onChange={handleStudentInput}
                value={studentForm.city}
                className="px-3 py-2.5 text-sm text-slate-900 dark:text-slate-50 rounded-md bg-white dark:bg-neutral-800 w-full outline-1 -outline-offset-1 outline-slate-300 dark:outline-neutral-700 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
              />
            </div>
            {editId === null ? (
              <button
                type="submit"
                className="bg-transparent cursor-pointer hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                Submit
              </button>
            ) : (
              <button
                type="submit"
                onClick={handleUpdateStudentData}
                className="bg-transparent cursor-pointer hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                Update
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="py-8">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {getData.map((e, i) => (
              <div
                key={e._id ?? i}
                className="rounded-lg bg-white dark:bg-neutral-800 outline-1 -outline-offset-1 outline-slate-300 dark:outline-neutral-700 p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 truncate">
                  {e.studentname}
                </h3>

                <div className="mt-3 space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
                  <p className="truncate">
                    <span className="font-medium text-slate-900 dark:text-slate-50">
                      Email:{" "}
                    </span>
                    {e.email}
                  </p>
                  <p className="truncate">
                    <span className="font-medium text-slate-900 dark:text-slate-50">
                      Course:{" "}
                    </span>
                    {e.course}
                  </p>
                  <p className="truncate">
                    <span className="font-medium text-slate-900 dark:text-slate-50">
                      City:{" "}
                    </span>
                    {e.city}
                  </p>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleStudentEdit(e)}
                    className="flex-1 cursor-pointer rounded-md border border-blue-500 py-2 px-3 text-sm font-semibold text-blue-700 hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStudentDelete(e._id)}
                    className="flex-1 cursor-pointer rounded-md border border-red-500 py-2 px-3 text-sm font-semibold text-red-600 hover:bg-red-500 hover:text-white transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {getData.length === 0 && (
            <p className="text-center text-sm text-slate-500 dark:text-slate-400">
              No students yet.
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
