import NavBar from '../components/NavBar';
import axios from 'axios';
import { useAuth } from "../hooks/useAuth";

import React, { useState } from 'react';

import { format } from 'date-fns';

function Dashboard() {
    const [appointement, setAppointement] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    const { user } = useAuth();

    const getUserAppointments = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_PATH}/appointement/user/${user._id}`)
            // console.log(response.data.result);
            setAppointement(res.data.result);
        } catch (err) {
            console.log(err);
        }
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
                                    {format(new Date(appointment.date[0].date), 'dd/MM/yyyy')}
                                </td>
                                <td className="px-6 py-4">
                                    {appointment.date[0].startingTime} - {appointment.date[0].endingTime}
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={
                                        () => cancelAppointement(appointment._id)
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
            )}
        </>
    );
}

export default Dashboard;