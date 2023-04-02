import axios from "axios";
import React, {useState} from "react";
import {toast} from "react-hot-toast";
import {FiX} from "react-icons/fi";
import Cookies from "universal-cookie";
import DoctorConfirmation from "../DoctorConfirmation";
import FieldInput from "./FieldInput";
import RadioButtons from "./RadioButtons";
import SelectInput from "./SelectInput";
import {useAuth} from "../hooks/useAuth";

function DoctorConfirmationDialog({id, setOpenDialog, open}) {
  const [subject, setSubject] = useState("");
  const [orientation, setOrientation] = useState("");
  const [title, setTitle] = useState("");
  const [nameExercice, setNameExercice] = useState("");
  const [birthName, setBirthName] = useState("");
  const [status, setStatus] = useState("");
  const [sex, setSex] = useState("");
  const [region, setRegion] = useState("");
  const [department, setDepartment] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [files, setFiles] = useState([]);
  const cookie = new Cookies();
  const {user} = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = cookie.get("auth_token");
    const formData = new FormData();

    formData.append("subject", subject);
    formData.append("orientation", orientation);
    formData.append("title", title);
    formData.append("nameExercice", nameExercice);
    formData.append("birthName", birthName);
    formData.append("status", status);
    formData.append("sex", sex);
    formData.append("region", region);
    formData.append("department", department);
    formData.append("address", address);
    console.log(files);
    files.forEach((file) => {
      formData.append("files", file);
    });

    axios
      .post(`${import.meta.env.VITE_API_PATH}/doctor/confirmation`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message);
        setFiles([]);
        setOpenDialog(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  // const handleSubmitFiles = (e) => {
  //   e.preventDefault();
  //   const token = cookie.get("auth_token");

  //   const formData = new FormData();
  //   files.forEach((file) => {
  //     formData.append("files", file);
  //   });

  //   axios
  //     .post(`${import.meta.env.VITE_API_PATH}/upload`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((response) => {
  //       setFiles([]);
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  const handleFileUpload = (event) => {
    // if file is not equal to pdf or image then return
    if (
      !event.target.files[0].type.includes("pdf") &&
      !event.target.files[0].type.includes("image")
    ) {
      return toast.error("Only pdf and image files are allowed");
    }
    // if file is equal to pdf or docx or doc then push it to files array
    const newFiles = Array.from(event.target.files);
    setFiles([...files, ...newFiles]);
  };

  const handleFileRemove = (index) => {
    const newFiles = files.filter((file, i) => i !== index);
    setFiles(newFiles);
  };

  return (
    <>
      <div
        id={id}
        tabIndex="-1"
        className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full"
      >
        <div class="relative w-full h-full max-w-7xl md:h-auto">
          {/* <!-- Modal content --> */}
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Doctor Confirmation
              </h3>
              <button
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => setOpenDialog(false)}
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <form>
              <div class="p-6 space-y-6">
                <div>
                  <h1 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Qualifications
                  </h1>
                  <div class="flex gap-32">
                    <div>
                      <SelectInput
                        placeholder="Choose a subject"
                        options={DoctorConfirmation.subjects}
                        onChange={(e) => setSubject(e.target.value)}
                        value={subject}
                      />
                    </div>
                    <div>
                      <SelectInput
                        placeholder="Choose a orientation"
                        options={DoctorConfirmation.orientations}
                        onChange={(e) => setOrientation(e.target.value)}
                        value={orientation}
                      />
                    </div>
                    <div>
                      <SelectInput
                        placeholder="Choose a subject"
                        options={DoctorConfirmation.titles}
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                      />
                    </div>
                  </div>
                </div>
                <hr class="w-full h-1 mx-auto my-4 bg-gray-200 border-0 rounded md:my-10 dark:bg-gray-700" />
                <div>
                  <h1 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Marital status
                  </h1>
                  <div class="flex gap-32">
                    <div>
                      <FieldInput
                        placeholder="Exercise name"
                        value={nameExercice}
                        onChange={(e) => setNameExercice(e.target.value)}
                      />
                    </div>
                    <div>
                      <FieldInput
                        placeholder="Birth Name"
                        value={birthName}
                        onChange={(e) => setBirthName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <hr class="w-full h-1 mx-auto my-4 bg-gray-200 border-0 rounded md:my-10 dark:bg-gray-700" />
                <div class="flex gap-32">
                  <div>
                    <h1 class="text-lg font-semibold text-gray-900 dark:text-white">
                      Status
                    </h1>
                    <RadioButtons
                      options={[
                        {value: "1", label: "Active"},
                        {value: "2", label: "Inactive"},
                      ]}
                      onChange={(e) => setStatus(e.target.value)}
                      value={status}
                    />
                  </div>
                  <div>
                    <h1 class="text-lg font-semibold text-gray-900 dark:text-white">
                      Sex
                    </h1>
                    <RadioButtons
                      options={[
                        {value: "Male", label: "Male"},
                        {value: "Female", label: "Female"},
                        {value: "Other", label: "Other"},
                      ]}
                      onChange={(e) => setSex(e.target.value)}
                      value={sex}
                    />
                  </div>
                </div>
                <hr class="w-full h-1 mx-auto my-4 bg-gray-200 border-0 rounded md:my-10 dark:bg-gray-700" />
                <div>
                  <h1 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Location
                  </h1>
                  <div class="flex gap-x-32 gap-y-4 flex-wrap">
                    <div>
                      <SelectInput
                        placeholder="Region"
                        value={region}
                        options={DoctorConfirmation.regions}
                        onChange={(e) => {
                          setRegion(e.target.value);
                          console.log(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <SelectInput
                        placeholder="Department"
                        value={department}
                        options={DoctorConfirmation.departments.filter(
                          (item) => item.region == region
                        )}
                        onChange={(e) => setDepartment(e.target.value)}
                      />
                    </div>
                    {/* <div>
                      <FieldInput
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div> */}
                    <div>
                      <FieldInput
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <hr class="w-full h-1 mx-auto my-4 bg-gray-200 border-0 rounded md:my-10 dark:bg-gray-700" />
                <div>
                  <h1 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Files and documents
                  </h1>
                  <div>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            aria-hidden="true"
                            className="w-10 h-10 mb-3 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            ></path>
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            PNG, JPG, JPEG, PDF
                          </p>
                        </div>

                        <input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                          onChange={handleFileUpload}
                          multiple
                          accept="image/*,application/pdf"
                        />
                      </label>
                    </div>
                    {files.length > 0 && (
                      <div className="mt-4">
                        <h3 className="font-semibold text-gray-600 dark:text-gray-400">
                          Selected files:
                        </h3>
                        <ul className="mt-2 flex">
                          {files.map((file, i) => (
                            <li
                              key={file.name}
                              className="flex items-center justify-between bg-blue-100 text-blue-800 text-s font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                            >
                              {file.name}

                              <button
                                type="button"
                                className="ml-2"
                                onClick={() => handleFileRemove(i)}
                              >
                                <FiX
                                  size={16}
                                  style={{
                                    verticalAlign: "middle",
                                    display: "inline-block",
                                    backgroundColor: "#f57187",
                                    borderRadius: "15%",
                                    padding: "2px",
                                  }}
                                />
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* <!-- Modal footer --> */}
              <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  data-modal-hide="defaultModal"
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={(e) => handleSubmit(e)}
                >
                  Submit
                </button>
                <button
                  data-modal-hide="defaultModal"
                  type="button"
                  class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  onClick={() => setOpenDialog(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default DoctorConfirmationDialog;
