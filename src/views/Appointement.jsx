import React, { useState } from "react";

import NavBar from "../components/navbar";
import axios from "axios";
import 'react-day-picker/dist/style.css';
import 'rc-time-picker/assets/index.css';


import { DayPicker } from 'react-day-picker';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import { differenceInCalendarDays, format } from 'date-fns';
import { useAuth } from "../hooks/useAuth";
import { enqueueSnackbar, closeSnackbar } from "notistack";


function Appointement() {
    const [doctors, setDoctors] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState({});
    const [startingTime, setStartingTime] = useState();
    const [endingTime, setEndingTime] = useState();
    const [selectedDay, setSelectedDay] = useState();
    const [appointement, setAppointement] = useState([]);
    const [disabledMinutes, setDisabledMinutes] = useState([55]);
    const { user } = useAuth();

    function disabledHours() {
        return [0, 1, 2, 3, 4, 5, 6, 7, 22, 23];
    }

    const getUserAppointments = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_PATH}/appointement/user/${user._id}`)
            setAppointement(res.data.result);
        } catch (err) {
            console.log(err);
        }
    }


    function isPastDate(date) {
        return differenceInCalendarDays(date, new Date()) < 0;
    }


    const getDoctors = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_PATH}/auth/confirmedDoctor`);
            // console.log(res.data.user);
            setDoctors(res.data.user);
        } catch (err) {
            console.log(err);
        }
    }

    const showAppointementModal = (doctor) => {
        setSelectedDoctor(doctor);
        setShowModal(true);
    }

    const hideAppointementModal = (doctor) => {
        setSelectedDoctor(doctor);
        setShowModal(false);
    }

    const changeSeletecTime = (value) => {
        console.log(value);
        setStartingTime(value);
        setEndingTime(moment(value).add(15, 'minutes'));
        // console.log(selectedDay);
        // console.log(value);

        disableMinuteByHourAndDay(selectedDay, value);
    }

    const changeDay = (day) => {
        // console.log(day);
        setSelectedDay(day);
        disableMinuteByHourAndDay(day, startingTime);
    }


    function disableMinuteByHourAndDay(day, hour) {
        console.log(day);
        // console.log(hour);
        const formatedDay = format(day, 'yyyy-MM-dd');
        const formatedHour = hour.format('HH');

        // console.log(formatedDay);

        // console.log(appointement[0].date[0].date.slice(0, 10));


        const filteredAppointement = appointement.filter((appointement) => {
            return appointement.startingTime.slice(0,10)== formatedDay && appointement.startingTime.slice(11, 13) == formatedHour;
        })


        const minutes = filteredAppointement.map((appointement) => {
            return appointement.startingTime.slice(14, 16);
        })


        setDisabledMinutes(minutes);
    }

    function disableMinutes() {
        // For each minutes found in the array, disable it
        return disabledMinutes.map((minute) => {
            return parseInt(minute);
        });
    }


    const createAppointement = () => {

        if (selectedDay === undefined || startingTime === undefined || endingTime === undefined) {
            enqueueSnackbar('Please select a day and a time', { variant: 'error' });
            return;
        } else {
            // const formatedStart = new Date(startingTime);
            // const formatedEnd = new Date(endingTime);

            // console.log(startingTime.format('HH:mm:ss'));

            // Add the formated date to the selected day
            // console.log(startingTime.format('HH:mm:ss'));
            // console.log(endingTime);

            const formatedStart = moment(startingTime).format('HH:mm:ss');
            const formatedEnd = moment(endingTime).format('HH:mm:ss');
            
            //Add the day to the formated date
            const formatedStartWithDay = moment(selectedDay).format('YYYY-MM-DD') + ' ' + formatedStart;
            const formatedEndWithDay = moment(selectedDay).format('YYYY-MM-DD') + ' ' + formatedEnd;


            axios.post(`${import.meta.env.VITE_API_PATH}/appointement`, {
                doctorId: selectedDoctor._id,
                patientId: user._id,
                startingTime: formatedStartWithDay,
                endingTime: formatedEndWithDay
            }).then((res) => {
                enqueueSnackbar("Appointement created successfully", {
                    variant: "success",
                });
                hideAppointementModal();
            }).catch((err) => {
                console.log(err);
            })
        }

    }

    React.useEffect(() => {
        getDoctors();
        getUserAppointments();
    }, []);


    return (
        <><NavBar />
            <div className='p-4 ml-64 custom-padding-top'>
                <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700 ">
                    <h1 className='text-2xl font-semibold text-gray-700 dark:text-gray-200'>Appointements</h1>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>Here you can create appointement with the doctor of your choice</p>
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
                                            <button onClick={() => showAppointementModal(doctor)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Appointement</button>
                                        </td>
                                    </tr>
                                </tbody>
                                </>
                            )
                        })}
                    </table>
                    {showModal && (
                        <div id="appointementModal" className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
                            <div className="relative w-full h-full max-w-md md:h-auto">
                                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                    <button onClick={hideAppointementModal} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                    <div className="px-6 py-6 lg:px-8">
                                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Select the date</h3>
                                        <form className="space-y-6" action="#">
                                            <DayPicker
                                                mode="single"
                                                selected={selectedDay}
                                                onSelect={changeDay}
                                                // onChange={changeDay}
                                                disabled={isPastDate}
                                            />
                                            {selectedDay && (
                                                <div className="flex flex-row justify-around">
                                                    <div>
                                                        <p className="mb-4 text-l font-medium text-gray-900 dark:text-white">Starting Time</p>
                                                        <TimePicker
                                                            defaultValue={startingTime}
                                                            showSecond={false}
                                                            minuteStep={15}
                                                            onChange={changeSeletecTime}
                                                            disabledHours={disabledHours}
                                                            disabledMinutes={disableMinutes}
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="mb-4 text-l font-medium text-gray-900 dark:text-white">Ending Time</p>
                                                        <TimePicker
                                                            defaultValue={endingTime}
                                                            value={endingTime}
                                                            showSecond={false}
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            <button className="w-full" type="button" onClick={createAppointement}>Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div></>
    )
}

export default Appointement;