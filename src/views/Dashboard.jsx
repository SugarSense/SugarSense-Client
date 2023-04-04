import NavBar from '../components/NavBar';
import axios from 'axios';
import { useAuth } from "../hooks/useAuth";

import React, { useState, useEffect } from 'react';
import { enqueueSnackbar, closeSnackbar } from "notistack";
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { Line } from "react-chartjs-2";
import moment from 'moment';
import { format } from 'date-fns';

function Dashboard() {
    const [appointement, setAppointement] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [range, setRange] = useState({});
    const [data, setData] = useState([]);
    const [labels, setLabels] = useState([]);

    const { user } = useAuth();

    const getUserAppointments = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_PATH}/appointement/user/${user._id}`)
            // console.log(res.data.result);
            // Sort the results by date
            res.data.result.sort((a, b) => {
                return new Date(a.startingTime) - new Date(b.startingTime);
            }
            );
            setAppointement(res.data.result);
        } catch (err) {
            console.log(err);
        }
    }

    // enqueueSnackbar('Your post has been archived', {
    //     variant: 'success',
    // })
    const cancelButton = (id) => {
        //Create a notification with the choice to delete the appointement or to cancel the action 
        enqueueSnackbar('Are you sure you want to cancel this appointment?', {
            variant: 'info',
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
                        }}>
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
    }

    const getDoctors = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_PATH}/auth/confirmedDoctor`);
            setDoctors(res.data.user);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }



    const cancelAppointement = (id) => {
        axios.delete(`${import.meta.env.VITE_API_PATH}/appointement/${id}`)
            .then(response => {
                getUserAppointments();
            })
            .catch(error => {
                console.log(error);
            });
    }


    const getGlucoseLevel = async () => {
        setRange(new Date());

        if (!user.dexcomToken) return;
        await axios
            .post(`${import.meta.env.VITE_API_PATH}/dexcom/EGVS`,
                {
                    date: range ? moment(range).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD"),
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.dexcomToken}`,
                    },
                })
            .then((res) => {
                // setData(res.data.records);
                const test = res.data.records.reverse().map((r) => moment(r.systemTime).format("HH:mm"))
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
                        <><tbody>
                            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <img src={doctor.avatar} alt="" className="w-8 h-8 rounded-full" />
                                </td>
                                <td className="px-6 py-4">
                                    {doctor.firstname} {doctor.lastname}
                                </td>
                                <td className="px-6 py-4">
                                    {doctor.specialization}
                                </td>
                                <td className="px-6 py-4">
                                    <a
                                        href="/appointement"
                                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                    >
                                        <span className="flex-1 ml-3 whitespace-nowrap">Appointement</span>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                        </>
                    )
                })}
            </table>
        )
    }

    const AppointmentsList = ({ appointments, doctors }) => {
        return (
            <tbody>
                {
                    appointments.map((appointment) => {
                        const doctor = doctors.find((doctor) => doctor._id === appointment.doctorId);
                        return (
                            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <td className="px-6 py-4">
                                    <img src={doctor.avatar} alt="" className="w-8 h-8 rounded-full" />
                                </td>
                                <td className="px-6 py-4">
                                    {doctor.firstname} {doctor.lastname}
                                </td>
                                <td className="px-6 py-4">
                                    {moment(appointment.startingTime).format('DD/MM/YYYY')}
                                </td>
                                <td className="px-6 py-4">
                                    {moment(appointment.startingTime).format('HH:mm')} - {moment(appointment.endingTime).format('HH:mm')}
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={
                                        () => cancelButton(appointment._id)
                                    } className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:bg-red-500">
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        );
                    })
                }
            </tbody>
        );
    };

    useEffect(() => {
        getUserAppointments();
        getDoctors();
        getGlucoseLevel();
    }, []);

    return (
        <><NavBar />
            {loading ? (
                <p>Loading...</p>
            ) : (

                <div className='p-4 ml-64 flex flex-wrap custom-padding-top'>
                    <div className="flex flex-wrap justify-center shadow-md">
                        <div className="w-full">
                            <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Welcome {user.firstname} ! 👋</h1>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-1">
                                <h2 className='text-2xl font-semibold text-gray-700 dark:text-gray-200'>Your appointments</h2>
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

                                        <AppointmentsList appointments={appointement} doctors={doctors} />

                                    </table>
                                ) : (
                                    <div className="flex flex-col items-center justify-center w-full h-full">
                                        <p className="text-xl font-semibold text-gray-700 dark:text-gray-200">You have no appointement</p>
                                        <p className="text-xl font-semibold text-gray-700 dark:text-gray-200">Please go to the appointement page to create one</p>
                                    </div>
                                )
                                }
                            </div>

                            {data && data.length > 0 ? (

                                <><div className="col-span-1">
                                    <h2 className='text-2xl font-semibold text-gray-700 dark:text-gray-200'>Today glucose evolution</h2>
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
                                        }} />
                                </div>
                                    <div className="col-span-1">
                                        <h2 className='text-2xl font-semibold text-gray-700 dark:text-gray-200'>Linked account</h2>
                                        <div className="flex flex-col items-center justify-center w-full h-full">
                                            <p className="text-xl font-semibold text-gray-700 dark:text-gray-200">Dexcom</p>
                                            <a href="/dexcomStats">
                                                <button className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                                                    See your stats
                                                </button>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-span-1">
                                        <h2 className='text-2xl font-semibold text-gray-700 dark:text-gray-200'>Doctor list</h2>
                                        <DoctorList />
                                    </div>

                                </>
                            ) : (
                                <>
                                    <div className="col-span-1">
                                        <h2 className='text-2xl font-semibold text-gray-700 dark:text-gray-200'>Today glucose evolution</h2>
                                        <div className="flex flex-col items-center justify-center w-full h-full">
                                            <p className="text-xl font-semibold text-gray-700 dark:text-gray-200">You don't have any glucose data yet</p>
                                            <p className="text-xl font-semibold text-gray-700 dark:text-gray-200">Please link your Dexcom account</p>
                                        </div>
                                    </div>
                                    <div className="col-span-1">
                                        <h2 className='text-2xl font-semibold text-gray-700 dark:text-gray-200'>Your linked account</h2>
                                        <div className="flex flex-col items-center justify-center w-full h-full">
                                            <p className="text-xl font-semibold text-gray-700 dark:text-gray-200">You don't have any account linked</p>
                                            <p className="text-xl font-semibold text-gray-700 dark:text-gray-200">Please link your Dexcom account</p>
                                        </div>
                                    </div>
                                    <div className="col-span-1">
                                        <h2 className='text-2xl font-semibold text-gray-700 dark:text-gray-200'>Doctor list</h2>
                                        <DoctorList />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

            )}
        </>
    );
}

export default Dashboard;