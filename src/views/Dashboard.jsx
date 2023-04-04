import NavBar from '../components/NavBar';
import axios from 'axios';
import { useAuth } from "../hooks/useAuth";

import React, { useState } from 'react';
import { enqueueSnackbar, closeSnackbar } from "notistack";
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import moment from 'moment';
import { format } from 'date-fns';

function Dashboard() {
    const [appointement, setAppointement] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    const { user } = useAuth();

    const getUserAppointments = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_PATH}/appointement/user/${user._id}`)
            console.log(res.data.result);
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

    React.useEffect(() => {
        getUserAppointments();
        getDoctors();
    }, []);


    const cancelAppointement = (id) => {
        axios.delete(`${import.meta.env.VITE_API_PATH}/appointement/${id}`)
            .then(response => {
                console.log(response);
                getUserAppointments();
            })
            .catch(error => {
                console.log(error);
            });
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


    return (
        <><NavBar />
            {loading ? (
                <p>Loading...</p>
            ) : (
                appointement.length !== 0 ? (
                    <div className='p-4 ml-64 custom-padding-top'>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                        </div>
                    </div>
                ) : (
                    <div className='p-4 ml-64 custom-padding-top'>
                        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                            You don't have any appointments yet
                        </h2>
                    </div>
                )

            )}
        </>
    );
}

export default Dashboard;