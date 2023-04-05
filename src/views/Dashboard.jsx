import NavBar from "../components/NavBar";
import axios from "axios";
import {useAuth} from "../hooks/useAuth";

import React, {useState, useEffect} from "react";
import {enqueueSnackbar, closeSnackbar} from "notistack";
import {AiOutlineCheck, AiOutlineClose} from "react-icons/ai";
import {Line} from "react-chartjs-2";
import moment from "moment";
import {format} from "date-fns";
import {Toaster, toast} from "react-hot-toast";

function Dashboard() {
  const [appointement, setAppointement] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState({});
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);

  const {user} = useAuth();

  const getUserAppointments = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_PATH}/appointement/user/${user._id}`
      );
      // console.log(res.data.result);
      // Sort the results by date
      res.data.result.sort((a, b) => {
        return new Date(a.startingTime) - new Date(b.startingTime);
      });
      setAppointement(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const getDoctors = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_PATH}/auth/confirmedDoctor`
      );
      setDoctors(res.data.user);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  // enqueueSnackbar('Your post has been archived', {
  //     variant: 'success',
  // })
  const cancelButton = (id) => {
    //Create a notification with the choice to delete the appointement or to cancel the action
    enqueueSnackbar("Are you sure you want to cancel this appointment?", {
      variant: "info",
      action: (key) => (
        <>
          <button
            onClick={() => cancelAppointement(id)}
            style={{
              color: "white",
              backgroundColor: "#358c38",
              borderRadius: "15px",
              padding: "5px",
              marginRight: "10px",
            }}
          >
            <AiOutlineCheck />
          </button>
          <button
            onClick={() => closeSnackbar(key)}
            style={{
              color: "white",
              backgroundColor: "#f44336",
              borderRadius: "15px",
              padding: "5px",
            }}
          >
            <AiOutlineClose />
          </button>
        </>
      ),
    });
  };

  const cancelAppointement = (id) => {
    axios
      .delete(`${import.meta.env.VITE_API_PATH}/appointement/${id}`)
      .then((response) => {
        getUserAppointments();
        enqueueSnackbar("Your appointement has been canceled", {
          variant: "success",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getGlucoseLevel = async () => {
    setRange(new Date());

    if (!user.dexcomToken) return;
    await axios
      .post(
        `${import.meta.env.VITE_API_PATH}/dexcom/EGVS`,
        {
          date: range
            ? moment(range).format("YYYY-MM-DD")
            : moment().format("YYYY-MM-DD"),
        },
        {
          headers: {
            Authorization: `Bearer ${user.dexcomToken}`,
          },
        }
      )
      .then((res) => {
        // setData(res.data.records);
        const test = res.data.records
          .reverse()
          .map((r) => moment(r.systemTime).format("HH:mm"));
        console.log(test);
        setLabels(test);
        setData(res.data.records);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const DoctorList = () => {
    return (
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              #
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Specialization
            </th>
            <th scope="col" className="px-6 py-3">
              Appointement
            </th>
          </tr>
        </thead>
        {doctors.map((doctor, index) => {
          return (
            <>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img
                      src={doctor.avatar}
                      alt=""
                      className="w-8 h-8 rounded-full"
                    />
                  </td>
                  <td className="px-6 py-4">
                    {doctor.firstname} {doctor.lastname}
                  </td>
                  <td className="px-6 py-4">{doctor.specialization}</td>
                  <td className="px-6 py-4">
                    <button
                      // href="/appointement"
                      onClick={() => handleAppointment()}
                      className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Appointement
                      </span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </>
          );
        })}
      </table>
    );
  };

  const AppointmentsList = ({appointments, doctors}) => {
    return (
      <tbody>
        {appointments.map((appointment) => {
          const doctor = doctors.find(
            (doctor) => doctor._id === appointment.doctorId
          );
          return (
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <td className="px-6 py-4">
                <img
                  src={doctor.avatar}
                  alt=""
                  className="w-8 h-8 rounded-full"
                />
              </td>
              <td className="px-6 py-4">
                {doctor.firstname} {doctor.lastname}
              </td>
              <td className="px-6 py-4">
                {moment(appointment.startingTime).format("DD/MM/YYYY")}
              </td>
              <td className="px-6 py-4">
                {moment(appointment.startingTime).format("HH:mm")} -{" "}
                {moment(appointment.endingTime).format("HH:mm")}
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => cancelButton(appointment._id)}
                  className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:bg-red-500"
                >
                  Cancel
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  };

  useEffect(() => {
    getUserAppointments();
    getDoctors();
    getGlucoseLevel();
  }, []);

  const handleAppointment = () => {
    if (user.verified) {
      window.location.href = "/appointement";
    } else {
      toast.error("You need to verify your account first !");
    }
  };

  const handleLoginDexcom = () => {
    if (user.verified) {
      window.location.href = `https://sandbox-api.dexcom.com/v2/oauth2/login?client_id=${
        import.meta.env.VITE_DEXCOM_CLIENT_ID
      }&redirect_uri=http://localhost:5173/dexcomStats&response_type=code&scope=offline_access&state=offline_access`;
    } else {
      toast.error("You need to verify your account first !");
    }
  };

  return (
    <>
      <NavBar />
      <Toaster />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="p-4 ml-64 flex flex-wrap">
          <div className="w-full">
            <h1 className="text-3xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
              Welcome {user.firstname} ! 👋
            </h1>
          </div>
          <div className="w-full flex flex-wrap justify-center">
            <div className="grid grid-cols-2 gap-4 mt-4 w-full">
              <div className="col-span-1 min-h-[400px] shadow-xl rounded-xl">
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 p-2">
                  Your appointments
                </h2>
                <hr className="mb-4" />
                {appointement.length !== 0 ? (
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          #
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Doctor Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Day
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Hour
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <AppointmentsList
                      appointments={appointement}
                      doctors={doctors}
                    />
                  </table>
                ) : (
                  <div className="flex flex-col items-center justify-center w-full h-full">
                    <p className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                      You have no appointement
                    </p>
                    <p className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                      Please go to the appointement page to create one
                    </p>
                  </div>
                )}
              </div>

              {data && data.length > 0 ? (
                <>
                  <div className="col-span-1 min-h-[400px] shadow-xl rounded-xl">
                    <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 p-2">
                      Today glucose evolution
                    </h2>
                    <hr className="mb-4" />

                    <Line
                      data={{
                        labels: labels,
                        datasets: [
                          {
                            label: "Glucose Level",
                            data: data.map((r) => r.value),
                            fill: false,
                            backgroundColor: "rgb(255, 99, 132)",
                            borderColor: "rgba(255, 99, 132, 0.2)",
                          },
                        ],
                      }}
                    />
                  </div>
                  <div className="col-span-1">
                    <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 p-2">
                      Linked account
                    </h2>
                    <hr className="mb-4" />
                    <div className="flex flex-col items-center justify-center w-full h-full">
                      <p className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                        Dexcom
                      </p>
                      <a href="/dexcomStats">
                        <button className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                          See your stats
                        </button>
                      </a>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-span-1 min-h-[400px] shadow-xl rounded-xl">
                    <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 p-2">
                      Today glucose evolution
                    </h2>
                    <hr className="mb-4" />
                    <div className="flex flex-col items-center justify-center w-full h-full">
                      <p className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                        You don't have any glucose data yet
                      </p>
                      <p className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                        Wait a bit for the data to fetch
                      </p>
                      <p className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                        Or if not already connect to dexcom
                      </p>
                    </div>
                  </div>
                  <div className="col-span-1 min-h-[400px] shadow-xl rounded-xl">
                    <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 p-2">
                      Your linked account
                    </h2>
                    <hr className="mb-4" />

                    <div className="flex flex-col items-center justify-center w-full h-full">
                      <p className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                        You don't have any account linked
                      </p>
                      <p className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                        Please link your Dexcom account
                      </p>
                      <button
                        type="button"
                        class="text-white mt-4 w-44 sm:w-44 bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        onClick={() => handleLoginDexcom()}
                      >
                        Connect to Dexcom
                      </button>
                    </div>
                  </div>
                </>
              )}
              <div className="col-span-1 min-h-[400px] shadow-xl rounded-xl">
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 p-2">
                  Doctor list
                </h2>
                <hr className="mb-4" />
                <DoctorList />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
