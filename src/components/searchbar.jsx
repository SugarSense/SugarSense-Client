import React, {useState, useEffect} from "react";
import {ReactSearchAutocomplete} from "react-search-autocomplete";
import {BiBluetooth} from "react-icons/bi";
import "../index.css";
import axios from "axios";

import {useAuth} from "../hooks/useAuth";

const handleOnSearch = (string, results) => {
  //console.log(string, results);
};

const handleOnHover = (result) => {
  //console.log(result);
};

const handleOnFocus = () => {
  //console.log("Focused");
};

const handleOnClear = () => {
  //console.log("Cleared");
};

function SearchBar({}) {
  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [data, setData] = useState([]);
  const [item, setItems] = useState([]);
  const {user} = useAuth();

  const getGlucoseMetersData = async () => {
    try {
      const res = await axios.get(`http://localhost:9001/glucoseMeters`);
      console.log(res.data); // Add this line to see the data
      const glucoseMetersData = res.data.map((item) => {
        return {
          _id: item._id, // assuming each item has an id
          name: item.name,
          img: item.img,
          description: item.description,
          bluetooth: item.bluetooth,
          batteryPercentage: item.batteryPercentage,
          insulinDoses: item.insulinDoses,
          lastSync: item.lastSync,
        };
      });
      console.log(glucoseMetersData); // Add this line to see the transformed data
      setItems(glucoseMetersData); // set the items with the transformed data
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getGlucoseMetersData();
  }, []);

  const handleOnSelect = async (item) => {
    setSelectedItem(item);
    setIsClicked(!isClicked);
    console.log(item);
    try {
      // récupérer l'id du glucosemeter
      const glucoseMeterId = item._id;
      // récupérer l'id de l'utilisateur
      const userId = user._id;
      // récupérer la table userId du glucosemeter actuel
      const glucoseMeter = await axios.get(
        `http://localhost:9001/glucoseMeters/${glucoseMeterId}`
      );
      const glucoseMeterUserId = glucoseMeter.data.userId;
      console.log(glucoseMeterUserId);
      console.log(glucoseMeterId);

      if (glucoseMeterUserId === null) {
        await axios.put(
          `http://localhost:9001/glucoseMeters/addUserID/${glucoseMeterId}`,
          {
            userId: userId,
          }
        );
        console.log("Glucosemeter added");
      } else {
        console.log("Glucosemeter already added");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteButtonClick = async () => {
    setSelectedItem(!selectedItem);
    try {
      // récupérer l'id du glucosemeter
      const glucoseMeterId = selectedItem._id;
      // récupérer l'id de l'utilisateur
      const userId = user._id;
      // récupérer la table userId du glucosemeter actuel
      const glucoseMeter = await axios.get(
        `http://localhost:9001/glucoseMeters/${glucoseMeterId}`
      );
      const glucoseMeterUserId = glucoseMeter.data.userId;
      console.log(glucoseMeterUserId);
      console.log(glucoseMeterId);
      console.log(userId);
      await axios.put(
        `http://localhost:9001/glucoseMeters/deleteUserID/${glucoseMeterId}`,
        {
          userId: userId,
        }
      );
      console.log("Glucosemeter deleted");
      // mise à jour de la liste des glucosemètres pour afficher les modifications
    } catch (err) {
      console.log(err);
    }
  };

  const handleGeolocationButtonClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const {latitude, longitude} = position.coords;
          setLocation({latitude, longitude});
          setErrorMessage(null);
        },
        (error) => {
          if (error.code === 1) {
            setErrorMessage(
              "Please allow location access to use this feature."
            );
            console.log(errorMessage);
          } else {
            setErrorMessage("Error getting location. Please try again.");
            console.log(errorMessage);
          }
        }
      );
    } else {
      setErrorMessage("Geolocation is not supported by this browser.");
    }
  };

  const locationAvailable = location && location.latitude && location.longitude;

  const svgFillColor = locationAvailable
    ? "text-green-500 dark:text-green-400"
    : "text-red-500 dark:text-red-400";

  const svgIconLocation = locationAvailable
    ? "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
    : "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z";

  return (
    <div className="px-4 pt-24 ml-64 font-worksans">
      <div className="px-4 py-2 border-2 border-gray-200 rounded-lg dark:border-gray-700">
        {!selectedItem ? (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsClicked(!isClicked)}
          >
            Add Meters
          </button>
        ) : null}
        {isClicked ? (
          <>
            <label className="block text-gray-700 text-xl mb-1 mt-1">
              Search for your meter
            </label>
            <ReactSearchAutocomplete
              items={item}
              onSearch={handleOnSearch}
              onHover={handleOnHover}
              onSelect={handleOnSelect}
              onFocus={handleOnFocus}
              onClear={handleOnClear}
              styling={{zIndex: 4}}
              autoFocus
              placeholder="search"
              className="w-4/5"
            />
          </>
        ) : null}
        {selectedItem ? (
          <div className="flex flex-col items-center">
            <div className="flex">
              <div className="glucosemeter flex flex-col items-center w-1/2">
                <img src={selectedItem.img} alt="meter" className="w-1/2" />
                <p className="text-justify text-xl py-4 ">
                  {selectedItem.name}
                </p>
                {selectedItem.bluetooth ? (
                  <>
                    <div className="flex items-center">
                      <BiBluetooth className="text-blue-500" />
                      <p className="text-sm">Bluetooth technology</p>
                    </div>
                  </>
                ) : (
                  <p className="text-sm">No Bluetooth</p>
                )}
                <p className="text-sm py-4">{selectedItem.description}</p>
              </div>
              <div className="information w-1/2 mt-8">
                <div className="flex justify-between items-center border-b-2 border-gray-200 pb-2 mb-4">
                  <p className="text-lg font-bold">Battery Percentage</p>
                  <p className="text-lg font-bold">
                    {selectedItem.batteryPercentage
                      ? selectedItem.batteryPercentage
                      : "N/A"}
                    %
                  </p>
                </div>
                <div className="flex justify-between items-center border-b-2 border-gray-200 pb-2 mb-4">
                  <p className="text-lg font-bold">Insulin Doses</p>
                  <p className="text-lg font-bold">
                    {selectedItem.insulinDoses
                      ? selectedItem.insulinDoses
                      : "N/A"}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold">Other Parameters</p>
                  <p className="text-lg font-bold">
                    {selectedItem.params ? selectedItem.params : "N/A"}
                  </p>
                </div>
                <div className="flex justify-between items-center border-b-2 border-gray-200 pb-2 mb-4">
                  <p className="text-lg font-bold">Last Sync</p>
                  <p className="text-lg font-bold">
                    {selectedItem.lastSync ? selectedItem.lastSync : "N/A"}
                  </p>
                </div>
                <div className="flex justify-evenly">
                  <div>
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
                      type="button"
                      onClick={() => setShowModal(true)}
                    >
                      Connect
                    </button>
                    {showModal ? (
                      <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                          <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                              {/*header*/}
                              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                <h3 className="text-3xl font-semibold">
                                  Connecter
                                </h3>
                                <button
                                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                  onClick={() => setShowModal(false)}
                                >
                                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                  </span>
                                </button>
                              </div>
                              {/*body*/}
                              <div className="relative p-6 flex-auto">
                                <p className="my-4 text-slate-600 text-lg leading-relaxed">
                                  <span className="font-bold">
                                    Tu dois autoriser les services de
                                    localisation
                                  </span>{" "}
                                  pour permettre le fonctionnement des
                                  connexions Bluetooth.{" "}
                                  <a href="#" className="text-blue-500">
                                    Découvrir pourquoi.
                                  </a>
                                </p>
                                <p className="my-4 text-slate-600 text-lg leading-relaxed">
                                  <span className="font-bold">
                                    Merci d'activer les services Bluetooth et de
                                    localisation{" "}
                                  </span>{" "}
                                  afin de permettre la connexion de ton
                                  dispositif et de notre utilisation de ce
                                  dernier.
                                </p>
                                <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
                                  <li className="flex items-center">
                                    <svg
                                      className={`w-4 h-4 mr-1.5 flex-shrink-0 ${svgFillColor}`}
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        d={`${svgIconLocation}`}
                                        clip-rule="evenodd"
                                      ></path>
                                    </svg>
                                    <button
                                      className="w-3/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                                      onClick={() => {
                                        handleGeolocationButtonClick();
                                      }}
                                    >
                                      Autoriser les fonctions de localisation
                                    </button>
                                  </li>
                                  <li>
                                    <p className="text-red-500">
                                      {errorMessage}
                                    </p>
                                  </li>
                                  <li className="flex items-center">
                                    <svg
                                      className="w-4 h-4 mr-1.5 text-gray-400 flex-shrink-0"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                        clip-rule="evenodd"
                                      ></path>
                                    </svg>
                                    <button className="w-3/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
                                      Autoriser les fonctions du bluetooth
                                    </button>
                                  </li>
                                </ul>
                              </div>
                              {/*footer*/}
                              <div className="flex items-center justify-end p-1 border-t border-solid border-slate-200 rounded-b">
                                <button
                                  className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                  type="button"
                                  onClick={() => setShowModal(false)}
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                      </>
                    ) : null}
                  </div>
                  <div>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                      onClick={() => handleDeleteButtonClick()}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SearchBar;
